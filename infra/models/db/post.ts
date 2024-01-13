import connectionMongo from "@/infra/providers/mongodb"

const mongoose = connectionMongo()

const PostSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true
  },
  img: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  subtitle: String,
  content: {
    type: String,
    required: true
  },
  tags: {
    type: Array<String>,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date,
  publishedAt: Date
}, { _id: false })
  .index({ slug: 1 })

PostSchema.pre("save", function (next) {
  this.updatedAt = new Date()
  next()
});

const Post = mongoose.model("post", PostSchema);

export default Post
