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
    const client = await redis
    return await client.get(`${this.name}:${id}`)
      .then((data) => {
        const result = JSON.parse(data!) as Type
        if(!result)
          throw new ErrorKV("Not found", ErrorKVCode.NotFound)
        if(options?.populate)
          return this.schema.populate<Type>(result)
        return result as Type
      })
      .catch(() => {
        throw new ErrorKV("Error on get data", ErrorKVCode.Unknown)
      })
  }

  public async getAll(options?: SearchOptions): Promise<Type[]> {
    const client = await redis
    return await client.keys(`${this.name}:*`)
      .then(async (keys) => {
        const data = await client.mGet(keys)

        return await Promise.all(
          data.map(async (value) => {
            const data = JSON.parse(value!) as Type
            // if(options?.populate)
            //   return await this.schema.populate<Type>(data)
            return data
          })
        )
      })
      .catch(() => {
        throw new ErrorKV("Error on get data", ErrorKVCode.Unknown)
      })
  }

  public async create(data: Type): Promise<Type> {
    const client = await redis
    let key: string
    if(!this.schema.exitKey)
      key = generateUUID()
    else {
      key = data[this.schema.getKey()]
      if(await client.exists(`${this.name}:${key}`))
        throw new ErrorKV("Already exists", ErrorKVCode.AlreadyExists)
      delete data[this.schema.getKey()]
    }

    await client.set(`${this.name}:${key}`, JSON.stringify(data))
    return data
   }

  public async update(id: idType, data: Partial<Type>): Promise<Type> {
    const client = await redis

    const oldData = await this.getById(id)

    await client.set(`${this.name}:${id}`, JSON.stringify({...oldData, ...data}))
    return {
      ...oldData,
      ...data
    }
  }

  public async delete(id: idType): Promise<void> {
    const client = await redis
    await client.del(`${this.name}:${id}`)
  }
}
