import { kv } from "@vercel/kv"
import generateUUID from "./uuid"

export enum ErrorKVCode {
  NotFound = 404,
  AlreadyExists = 409,
  Invalid = 422,
  Unknown = 500,
}

export class ErrorKV extends Error {
  public readonly code: ErrorKVCode
  constructor(message: string, code: ErrorKVCode) {
    super(message)
    this.name = "ErrorKV"
    this.code = code
  }

  getError() {
    return {
      code: this.code,
      message: this.message,
    }
  }
}

export default class KVSchema<TypeKV> {
  private readonly start: string
  private readonly schema: string
  constructor(start: string, schema: string) {
    this.start = start
    this.schema = schema
  }

  getSchema() {
    return this.schema
  }
  getStart() {
    return this.start
  }

  async save(data: TypeKV, id?: string) {
    if(id === undefined) id = generateUUID()
    const key = this.start + id
    await kv.get(key).then((value) => {
      if (value === null) {
        kv.set(key, data)
      } else {
        throw new ErrorKV(`The ${this.schema} exist id ${id}`, ErrorKVCode.AlreadyExists)
      }
    }).catch((err) => {
      throw new ErrorKV(err, ErrorKVCode.Unknown)
    })
  }
  async update(id: string, data: TypeKV) {
    const key = this.start + id
    return await kv.get(key).then((value) => {
      if (value === null) {
        throw new ErrorKV(`The ${this.schema} not exist id ${id}`, ErrorKVCode.NotFound)
      } else {
       kv.set(key, data)
       return value as TypeKV
      }
    }).catch((err) => {
      throw new ErrorKV(err, ErrorKVCode.Unknown)
    })
  }

  async get(id: string) {
    const key = this.start + id
    try {
      return await kv.get(key).then((value) => {
        if (value === null) {
          throw new ErrorKV(`The ${this.schema} not exist id ${id}`, ErrorKVCode.NotFound)
        } else {
          return value as TypeKV
        }
      }).catch((err) => {
        throw new ErrorKV(err, ErrorKVCode.Unknown)
      })
    } catch (error) {
      throw new ErrorKV(error+"", ErrorKVCode.NotFound)
    }
  }

  async delete(id: string) {
    const key = this.start + id
    return await kv.get(key).then((value) => {
      if (value === null) {
        throw new ErrorKV(`The ${this.schema} not exist id ${id}`, ErrorKVCode.NotFound)
      } else {
        kv.del(key)
        return value as TypeKV
      }
    }).catch((err) => {
      throw new ErrorKV(err, ErrorKVCode.Unknown)
    })
  }

  async exist(id?: string, data?: TypeKV) {
    if((!id && !data) || (id && data)) throw new ErrorKV("You must specify id or data", ErrorKVCode.Invalid)
    if(id) return await this.existId(id)
    return await this.existData(data!)
  }

  async filter(fl: (value: TypeKV) => boolean) {
    const keys = await kv.keys(this.start + "*")
    const values = await Promise.all(keys.map(key => kv.get(key) as Promise<TypeKV>))
    return values.filter(fl)
  }

  private async existId(id: string) {
    const key = this.start + id
    return await kv.get(key).then((value) => {
      if (value === null) {
        return false
      } else {
        return true
      }
    }).catch((err) => {
      throw new ErrorKV(err, ErrorKVCode.Unknown)
    })
  }

  private async existData(data: TypeKV) {
    const keys = await kv.keys(this.start + "*")
    const values = await Promise.all(keys.map(key => kv.get(key) as Promise<TypeKV>))
    return values.some((value) => {
      return JSON.stringify(value) === JSON.stringify(data)
    })
  }

  async getAll() {
    const keys = await kv.keys(this.start + "*")
    return await Promise.all(keys.map(async (key) => {
      const data = await kv.get(key) as Promise<TypeKV>
      return {
        id: key.replace(this.start, ""),
        ...data
      }
    }))
  }
}
