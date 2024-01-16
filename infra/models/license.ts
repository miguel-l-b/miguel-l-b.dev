import { z } from "zod"

export const licenseSchema = z.object({
  name: z.string().min(1).max(15),
  description: z.string().min(1).max(1500),
  projects: z.optional(z.array(z.string())),
  site: z.optional(z.string().url())
})

export type licenseType = z.infer<typeof licenseSchema>
