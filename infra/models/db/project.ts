import connectionMongo from "@/infra/providers/mongodb"
import mongoose from "mongoose"
import { z } from "zod"
connectionMongo()
const ProjectSchema = new mongoose.Schema({
  slug: {
    type: String,
    index: true,
    required: true,
    unique: true
  },
  img: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tags: {
    type: Array<String>,
    required: true
  },
  license: {
    type: String,
    default: false
  },
  techs: {
    type: Array<String>,
    required: true
  },
  github: String,
  demo_url: String,
}, { _id: false })
  .index({ slug: 1 })

export const projectSchema = z.object({
  slug: z.string(),
  img: z.string().url(),
  name: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  license: z.string(),
  techs: z.array(z.string()),
  github: z.optional(z.string().url()),
  demo_url: z.optional(z.string().url()),
})
export type ProjectType = z.infer<typeof projectSchema>

const ProjectDB = mongoose.model("projects", ProjectSchema)
export default ProjectDB
