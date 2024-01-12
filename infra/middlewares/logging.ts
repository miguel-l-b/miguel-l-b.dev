import { NextApiRequest, NextApiResponse } from "next"
import { NextHandler } from "next-connect"
export default function withLogging(req: NextApiRequest, res: NextApiResponse, next: NextHandler) {

  console.time(`${req.socket.remoteAddress}#${req.method} - ${req.url} in:`)
  next()
  console.timeEnd(`${req.socket.remoteAddress}#${req.method} - ${req.url} in:`)
}
