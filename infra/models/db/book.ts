import connectionMongo from "@/infra/providers/mongodb"

const mongoose = connectionMongo()

const BookSchema = new mongoose.Schema({
  img: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  why: {
    type: String,
    required: true
  },
  buy: Array<{
    logo: string,
    url: string
    isElectric: boolean
  }>
})

const Book = mongoose.model("book", BookSchema)

export default Book
