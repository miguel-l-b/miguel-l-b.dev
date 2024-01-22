import { KVSchema, convertToSchema } from "@/infra/utils/kv"
import { z } from "zod"

const dbSchema = {
  title: {
    type: z.string()
  },
  content: {
    type: z.string()
  },
  date: {
    type: z.string()
  }
}

export const timelineSchema = convertToSchema<typeof dbSchema>(dbSchema)
export type TimelineType = z.infer<typeof timelineSchema>

const TimelineDB = new KVSchema(dbSchema).model<typeof dbSchema>("timeline")
export default TimelineDB
