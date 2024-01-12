import {  createRouter } from "next-connect"
import { kv } from "@vercel/kv"
import { withLogging } from "@/infra/middlewares"
import { redirectType } from "@/infra/models"
import { UnauthorizedError } from "@/infra/models/responses"
import { NextApiRequest, NextApiResponse } from "next"
import withErrorInternal from "@/infra/utils/error"
import validToken from "@/infra/utils/valid_token"

const router = createRouter<NextApiRequest, NextApiResponse>()
  .use(withLogging)
  .get(getHandle)

async function getHandle(req: NextApiRequest, res: NextApiResponse) {
  const { populate } = req.query

  if(populate && !validToken(req, res))
    return res.status(401).json(UnauthorizedError())

  const keys = await kv.keys("*")
  if(populate === "true") {
    const result = Promise.all(keys.flatMap(async (key) => await kv.get(key) as redirectType))
    return res.status(200).json(await result)
  }

  return res.status(200).json(keys)
}

export default router.handler({ onError: withErrorInternal })
