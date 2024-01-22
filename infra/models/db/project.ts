import mongoose from "mongoose"

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

const ProjectDB = mongoose.model("project", ProjectSchema)
export default ProjectDB
