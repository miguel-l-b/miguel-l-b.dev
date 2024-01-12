import Cookies from "cookies"
import jwt from "jsonwebtoken"
import { NextApiRequest, NextApiResponse } from "next"

export default function validToken(req: NextApiRequest, res: NextApiResponse) {
  const cookies = Cookies(req, res)

  if(!cookies.get("token"))
    return res.status(401).json({ error: "No token provided" })

  if (cookies.get("token")) {
    const { admin } = jwt.verify(cookies.get("token")!, process.env.SECRET!) as { admin: boolean }
    if (admin) return true
  }

  return false
}
