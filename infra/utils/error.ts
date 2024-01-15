import { NextApiRequest, NextApiResponse } from "next"
import generateUUID from "./uuid"

export default function withErrorInternal(error: unknown, req: NextApiRequest, res: NextApiResponse) {
  const id = generateUUID()
  console.error(`Error ID: ${id} > \n`, error)
  return res.status(500).json(
    {
      error: "Internal Server Error",
      message: "Unfortunately you hear an unexpected error, if it happens again contact support and send the ID and IP below.",
      id,
      ip: req.socket.remoteAddress
    },
  )
}
