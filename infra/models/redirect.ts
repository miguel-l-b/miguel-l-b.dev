import { z } from "zod"

export const redirectSchema = z.object({
  name: z.string().trim().min(1).max(15),
  url: z.string().url(),
})

export type redirectType = z.infer<typeof redirectSchema>
