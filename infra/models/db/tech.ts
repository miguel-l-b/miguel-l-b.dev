import { KVSchema, convertToSchema } from "@/infra/utils/kv"
import { z } from "zod"

const dbSchema = {
  img: {
    type: z.string().url()
  },
  name: {
    type: z.string().min(1).max(15),
    index: true,
    unique: true
  },
  description: {
    type: z.string().min(1).max(2500),
  },
  category: {
    type: z.string().min(1).max(15),
  },
  tags: {
    type: z.array(z.string())
  },
  license: {
    type: z.optional(z.string().uuid()),
  },
  projects: {
    type: z.optional(z.array(z.string()))
  },
  parents: {
    type: z.optional(z.array(z.string().uuid()))
  },
  github: {
    type: z.optional(z.string().url())
  },
  site: {
    type: z.optional(z.string().url())
  }
}

export const techSchema = convertToSchema<typeof dbSchema>(dbSchema)
export type TechType = z.infer<typeof techSchema>

const TechDB = new KVSchema(dbSchema).model<typeof dbSchema>("tech")
export default TechDB
