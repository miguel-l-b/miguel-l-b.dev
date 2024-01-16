import Cookies from "cookies"
import { createRouter } from "next-connect"
import { NextApiRequest, NextApiResponse } from "next"
import jwt from "jsonwebtoken"

import { withLogging } from "@/infra/middlewares"
import validToken from "@/infra/utils/valid_token"


const router = createRouter<NextApiRequest, NextApiResponse>()
  .use(withLogging)
  .get(getHandle)
  .post(postHandle)

async function getHandle(req: NextApiRequest, res: NextApiResponse) {
  const cookies = new Cookies(req, res)

  if (!cookies.get("token"))
    return res.status(404).json({ error: "No password provided" })

  if (cookies.get("token")) {
    if(validToken(req, res))
      return res.status(200).json({ success: true })
    else
      return res.status(401).json({ error: "Invalid token" })
  }
}

async function postHandle(req: NextApiRequest, res: NextApiResponse) {
  const cookies = new Cookies(req, res)
  const { password } = req.body

  if (!password || typeof password !== "string" || password.length === 0)
    return res.status(400).json({ error: "Bad request", message: "The request body is invalid." })

  if (password === process.env.ADMIN_SECRET) {
    const token = jwt.sign({ admin: true }, process.env.SECRET!, { expiresIn: "7d" })
    cookies.set("token", token, { httpOnly: true, maxAge: 60 * 60 * 60 * 24 * 30 })
    return res.status(200).json({ success: true })
  } else {
    return res.status(401).json({ error: "Unauthorized", message: "You are not authorized to perform this action." })
  }
}

export default router.handler()
