import mongoose from "mongoose"

class MongoClient {
  static logged = false

  private static async handleConnection() {
    try {
      console.log("Connecting to MongoDB...")
      console.time("MongoDB connection in")
      await mongoose.connect(process.env.MONGODB_URI!)
      console.timeEnd("MongoDB connection in")
      MongoClient.logged = true
    } catch (error) {
      console.error("Error connecting to MongoDB", error)
      throw new Error("Error connecting to MongoDB")
    }
  }

  public static connect() {
    if (!MongoClient.logged)
      MongoClient.handleConnection()
    return mongoose
  }
}

export default MongoClient
