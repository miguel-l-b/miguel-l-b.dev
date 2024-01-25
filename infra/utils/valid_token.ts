import Cookies from "cookies"
import { IncomingMessage, ServerResponse } from "http"
import jwt from "jsonwebtoken"

export default function validToken(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
  const cookies = Cookies(req, res)

  if(!cookies.get("token"))
    return false

  if (cookies.get("token")) {
    const { admin } = jwt.verify(cookies.get("token")!, process.env.SECRET!) as { admin: boolean }
    if (admin) return true
  }

  return false
}
