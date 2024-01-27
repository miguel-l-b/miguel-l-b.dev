import mongoose from "mongoose"
import { z } from "zod"

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

const projectSchema = z.object({
  slug: z.string(),
  img: z.string().url(),
  name: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  license: z.string(),
  techs: z.array(z.string()),
  github: z.string().url(),
  demo_url: z.string().url(),
})
export type ProjectType = z.infer<typeof projectSchema>

const ProjectDB = mongoose.model("project", ProjectSchema)
export default ProjectDB
