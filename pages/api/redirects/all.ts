import { kv } from "@vercel/kv"
import { NextApiRequest, NextApiResponse } from "next"

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { authorization } = req.headers
  if(authorization !== process.env.ADMIN_SECRET)
    return res.status(401).json({ error: "Unauthorized", message: "You are not authorized to perform this action." })

  const keys = await kv.keys("*")
  const result = Promise.all(keys.flatMap(async (key) => await kv.get(key)))
  return res.status(200).json(await result)
}
