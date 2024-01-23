import { ErrorKV, ErrorKVCode, KVSchema, ReferenceKey } from "."
import redis from "@/infra/providers/redis"
import generateUUID from "../uuid"

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

  public async getById(id: idType, options?: SearchOptions): Promise<Type> {
    return await redis.get<Type>(`${this.name}:${id}`)
      .then((data) => {
        if(!data)
          throw new ErrorKV("Not found", ErrorKVCode.NotFound)
        if(options?.populate)
          return this.schema.populate<Type>(data)
        return data as Type
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
            if(options?.populate)
              return await this.schema.populate<Type>(e)
            return e
          })
        )
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

    await redis.set(`${this.name}:${key}`, JSON.stringify(data))
    return data
   }

  public async update(id: idType, data: Partial<Type>): Promise<Type> {

    const oldData = await this.getById(id)

    await redis.set(`${this.name}:${id}`, JSON.stringify({...oldData, ...data}))
    return {
      ...oldData,
      ...data
    }
  }

  public async delete(id: idType): Promise<void> {
    await redis.del(`${this.name}:${id}`)
  }
}
