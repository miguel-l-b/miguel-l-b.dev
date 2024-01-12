import { NextApiRequest, NextApiResponse } from "next"

export default function withErrorInternal(error: unknown, req: NextApiRequest, res: NextApiResponse) {
  const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  console.error(`Error ID: ${id} > \n`, error)
  return res.json(
    {
      error: "Internal Server Error",
      message: "Unfortunately you hear an unexpected error, if it happens again contact support and send the ID and IP below.",
      id,
      ip: req.socket.remoteAddress
    },
  )
}
