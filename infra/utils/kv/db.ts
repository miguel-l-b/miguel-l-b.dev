import { ErrorKV, ErrorKVCode, KVSchema, ReferenceKey } from "."
import redis from "@/infra/providers/redis"
import generateUUID from "../uuid"
import { CacheDB } from "./cache"

interface TypeData {
  [key: string]: any
}

interface SearchOptions {
  populate?: boolean
}

export class KVModelDB<Type extends TypeData, idType> {
  constructor(private schema: KVSchema, private name: string) {}

  public refKey(): ReferenceKey {
    return {
      model: this.name,
      handle: this.getById,
    }
  }

  private changeId(data: any, id: any): Type {
    data[this.schema.getKey()] = id
    return data
  }

  public async getById(id: idType, options?: SearchOptions): Promise<Type> {
    const findKey = `${this.name}:${id}`
    const cache = CacheDB.getByKey<Type>(findKey)
    if(cache)
      return this.changeId(cache, id)
    return await redis.get<Type>(findKey)
      .then((data) => {
        if(!data)
          throw new ErrorKV("Not found", ErrorKVCode.NotFound)
        CacheDB.set(findKey, data)

        if(options?.populate)
          return this.changeId(this.schema.populate<Type>(data), id)
        return this.changeId(data, id)
      })
      .catch(() => {
        throw new ErrorKV("Error on get data", ErrorKVCode.Unknown)
      })
  }

  public async getAll(options?: SearchOptions): Promise<Type[]> {
    return await redis.keys(`${this.name}:*`)
      .then(async (keys) => {
        const data = await redis.mget<Type[]>(keys)

        return await Promise.all(
          data.map(async (e) => {
            const id = e[this.schema.getKey()]
            CacheDB.set(`${this.name}:${e[id]}`, e)

            if(options?.populate)
              return this.changeId(await this.schema.populate<Type>(e), id)
            return this.changeId(e, id)
          })
        )
      })
      .catch(() => {
        throw new ErrorKV("Error on get data", ErrorKVCode.Unknown)
      })
  }

  public async getKeys(): Promise<idType[]> {
    return await redis.keys(`${this.name}:*`)
      .then((keys) => {
        return keys.map((e) => e.split(":")[1]) as idType[]
      })
      .catch(() => {
        throw new ErrorKV("Error on get data", ErrorKVCode.Unknown)
      })
  }

  public async create(data: Type): Promise<Type> {
    let key: string
    if(!this.schema.exitKey)
      key = generateUUID()
    else {
      key = data[this.schema.getKey()]
      if(await redis.exists(`${this.name}:${key}`))
        throw new ErrorKV("Already exists", ErrorKVCode.AlreadyExists)
      delete data[this.schema.getKey()]
    }

    CacheDB.set(`${this.name}:${key}`, data)
    await redis.set(`${this.name}:${key}`, data)

    return data
   }

  public async update(id: idType, data: Partial<Type>): Promise<Type> {

    const oldData = await this.getById(id)

    CacheDB.set(`${this.name}:${id}`, {...oldData, ...data})
    await redis.set(`${this.name}:${id}`, {...oldData, ...data})
    return {
      ...oldData,
      ...data
    }
  }

  public async delete(id: idType): Promise<void> {
    await redis.del(`${this.name}:${id}`)
  }
}
