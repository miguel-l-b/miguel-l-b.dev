import { z } from "zod"

export default async function ValidSchema(Schema: z.Schema, data: any) {
  return await Schema.safeParseAsync(data).then((result) => {
    if(!result.success)
      return false
    return true
  }).catch((error) => {
    return false
  })
}
