import { KVSchema, convertToSchema } from "@/infra/utils/kv"
import { z } from "zod"

const dbSchema = {
  img: {
    type: z.string().url()
  },
  name: {
    type: z.string().min(1).max(20),
    index: true,
    unique: true
  },
  why: {
    type: z.string().min(1).max(2500),
  },
  buy: {
    type: z.array(z.object({
      logo: z.string().url(),
      url: z.string().url(),
      isElectronic: z.boolean()
    }))
  }
}

export const bookSchema = convertToSchema<typeof dbSchema>(dbSchema)
export type BookType = z.infer<typeof bookSchema>

const BookDB = new KVSchema(dbSchema).model<typeof dbSchema>("book")
export default BookDB
