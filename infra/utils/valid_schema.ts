import { z } from "zod"

export default async function ValidSchema<T>(Schema: z.Schema, data: T) {
  try {
    return await Schema.parseAsync(data).then((result) => {
      return true
    }).catch((err) => {
      return false
    })
  } catch (error) {
    return false
  }
}
