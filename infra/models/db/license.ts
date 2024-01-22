import mongoose from "mongoose"

const LicenseSchema = new mongoose.Schema({
  img: {
    type: String,
    required: true
  },
  name: {
    type: String,
    index: true,
    required: true
  },
  why: {
    type: String,
    required: true
  },
  buy: {
    type: Array,
    required: true
  }
}, { _id: false })
  .index({ name: 1 })

const LicenseDB = mongoose.model("license", LicenseSchema)
export default LicenseDB
