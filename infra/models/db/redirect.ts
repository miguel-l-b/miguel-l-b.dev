import { KVSchema, convertToSchema } from "@/infra/utils/kv/schema"
import { z } from "zod"

const dbSchema = {
  id: {
    type: z.string(),
    index: true
  },
  name: {
    type: z.string().trim().min(1).max(15),
    unique: true
  },
  url: {
    type: z.string().url()
  }
}

export const redirectSchema = convertToSchema<typeof dbSchema>(dbSchema)
export type RedirectType = z.infer<typeof redirectSchema>

const RedirectDB = new KVSchema(dbSchema).model<typeof dbSchema>("redirect")
export default RedirectDB
