import { withLogging } from "@/infra/middlewares"
import { redirectSchema } from "@/infra/models"
import withErrorInternal from "@/infra/utils/error"
import ValidSchema from "@/infra/utils/valid_schema"
import validToken from "@/infra/utils/valid_token"
import { kv } from "@vercel/kv"
import { NextApiRequest, NextApiResponse } from "next"
import { createRouter } from "next-connect"

const router = createRouter<NextApiRequest, NextApiResponse>()
  .use(withLogging)
  .post(postHandle)

async function postHandle(req: NextApiRequest, res: NextApiResponse) {
  const { url, name } = req.body

  if(!validToken(req, res))
    return res.status(401).json({ error: "Unauthorized", message: "You are not authorized to perform this action." })

  if(!await ValidSchema(redirectSchema, { id: "rd@123", ...req.body }))
    return res.status(400).json({ error: "Bad request", message: "The request body is invalid." })

  const id = Math.random().toString(36).slice(2)

  const redirect = await kv.set(`rd@${id}`, { url, name })
  res.status(201).json({ id, url, name })
}

export default router.handler({ onError: withErrorInternal })
