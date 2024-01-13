import mongoose from "mongoose"


let client: typeof mongoose | null = null

async function handleConnection() {
  try {
    console.log("Connecting to MongoDB...")
    console.time("MongoDB connection in")
    client = await mongoose.connect(process.env.MONGODB_URI!)
    console.timeEnd("MongoDB connection in")
  } catch (error) {
    console.error("Error connecting to MongoDB", error)
    throw new Error("Error connecting to MongoDB")
  }
}

export default function connectionMongo() {
  if (!client) handleConnection()
  return client!
}
