import { z } from "zod"

export const timelineSchema = z.object({
  title: z.string(),
  content: z.string(),
  date: z.string(),
})

export type timelineType = z.infer<typeof timelineSchema>
