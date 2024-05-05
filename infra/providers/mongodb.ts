import mongoose from "mongoose"


let logged = false

async function handleConnection() {
  try {
    console.log("Connecting to MongoDB...")
    console.time("MongoDB connection in")
    await mongoose.connect(process.env.MONGODB_URI!)
    console.timeEnd("MongoDB connection in")
    logged = true
  } catch (error) {
    console.error("Error connecting to MongoDB", error)
    throw new Error("Error connecting to MongoDB")
  }
}

export default function connectionMongo() {
  // if (!logged)
  handleConnection()
  return mongoose
}
