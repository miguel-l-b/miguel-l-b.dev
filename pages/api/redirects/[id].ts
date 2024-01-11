import { kv } from "@vercel/kv"
import { NextApiRequest, NextApiResponse } from "next"

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  const result = await kv.get<{id: string; url: string; name: string}>(id as string)

  if (!result)
    return res.status(404).json({ error: "Not found", message: `The redirect ${id} is not found.` })
  res.status(200).json(result)
}
