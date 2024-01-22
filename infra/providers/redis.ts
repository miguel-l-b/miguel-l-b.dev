import { createClient } from "redis"

let redis = createClient({
  url: process.env.REDIS_URL,
})

async function handleConnection() {
  await redis.connect()
  redis.on("error", (error) => {
    console.error(error)
  })
  return redis
}

export default handleConnection()
