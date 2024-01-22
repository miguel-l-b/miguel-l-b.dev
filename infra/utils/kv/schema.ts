import { z } from "zod"
import { ErrorKV, ErrorKVCode, KVModelDB } from "."

export type ReferenceKey = {
  model: string,
  handle: (value: any) => Promise<any>
}

export type baseSchemaField = {
  type: z.ZodTypeAny,
  reference?: ReferenceKey,
  unique?: boolean,
  index?: boolean,
}

export interface Schema {
  [key: string]: baseSchemaField
}

export function convertToSchema<T extends Schema>(schema: { [K in keyof T]: {type: T[K]["type"]}  }) {
  let newSchema: { [K in keyof T]: T[K]["type"] } = {} as any
  for (const key in schema) {
    const value = schema[key]
    newSchema[key] = value.type
  }

  return z.object({ ...newSchema })
}

export class KVSchema {
  exitKey = false
  constructor(public readonly schema: Schema) {
    this.handleKey()
  }

  private handleKey() {
    this.exitKey = false
    for (const key in this.schema) {
      const value = this.schema[key]
      if (value.index) {
        if(value.type instanceof z.ZodObject)
          throw new ErrorKV("Key cannot be an object", ErrorKVCode.Schema)
        if(value.type instanceof z.ZodArray)
          throw new ErrorKV("Key cannot be an array", ErrorKVCode.Schema)

        if(this.exitKey)
          throw new ErrorKV("Only one key can be indexed", ErrorKVCode.Schema)
        this.exitKey = true
      }
    }
  }

  public getKey() {
    for (const key in this.schema) {
      if(this.schema[key].index)
        return key
    }

    return ""
  }

  public getUniqueKeys() {
    const keys: string[] = []
    for (const key in this.schema) {
      const value = this.schema[key]
      if (value.unique) {
        keys.push(key)
      }
    }
    return keys
  }

  public getReferenceKeys() {
    const keys: string[] = []
    for (const key in this.schema) {
      const value = this.schema[key]
      if (value.reference) {
        keys.push(key)
      }
    }
    return keys
  }

  public async populate<T>(data: any): Promise<T> {
    const key = this.getReferenceKeys()
    if(key.length === 0)
      return data
    await Promise.all(key.map(async (key) => {
      const value = this.schema[key]
      const ref = value.reference!
      const refData = await ref.handle(data[key])
      data[key] = refData
    }))

    return data
  }

  public model<T extends Schema>(name: string) {
    return new KVModelDB<{
      [K in keyof T]: z.infer<T[K]["type"]>
    }, any>(this, name)
  }
}
