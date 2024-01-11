import { kv } from "@vercel/kv"
import { NextApiRequest, NextApiResponse } from "next"

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { url, name } = req.body

  if(
    (url === undefined || typeof url !== "string" || url.length === 0) ||
    (name !== undefined && typeof name !== "string" || name.length === 0)
  )
    return res.status(400).json({ error: "Bad request", message: "The request body is invalid." })

  const id = Math.random().toString(36).slice(2)
  const redirect = await kv.set(id, { id, url, name })
  res.status(201).json({ id, url, name })
}
