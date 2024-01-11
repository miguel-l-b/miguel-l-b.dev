import { kv } from "@vercel/kv"
import { NextApiRequest, NextApiResponse } from "next"

export default async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body

  const result = await kv.get<{id: string; url: string; name: string}>(id as string)

  if (!result)
    return res.status(404).json({ error: "Not found", message: `The redirector ${id} is not found.` })

  await kv.del(id as string).then(() => res.status(204).end())
  .catch(() => res.status(500).json({ error: "Internal server error", message: "An error occurred while deleting the redirect." }))
}
