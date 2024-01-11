import { kv } from "@vercel/kv"
import { NextApiRequest, NextApiResponse } from "next"

export default async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body
  const { authorization } = req.headers

  const result = await kv.get<{id: string; url: string; name: string}>(id as string)

  if(authorization !== process.env.ADMIN_SECRET)
    return res.status(401).json({ error: "Unauthorized", message: "You are not authorized to perform this action." })

  if (!result)
    return res.status(404).json({ error: "Not found", message: `The redirector ${id} is not found.` })

  await kv.del(id as string).then(() => res.status(204).end())
  .catch(() => res.status(500).json({ error: "Internal server error", message: "An error occurred while deleting the redirect." }))
}
