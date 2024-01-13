import { z } from "zod";

export const techSchema = z.object({
  id: z.string().uuid(),
  img: z.string().url(),
  name: z.string().min(1).max(15),
  description: z.string().min(1).max(250),
  tags: z.array(z.string()),
  license: z.string().uuid(),
  projects: z.optional(z.array(z.string())),
  parents: z.optional(z.array(z.string().uuid())),
  github: z.optional(z.string().url()),
  site: z.optional(z.string().url())
})

export type techType = z.infer<typeof techSchema>
