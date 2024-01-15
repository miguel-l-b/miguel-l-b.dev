import { withLogging } from "@/infra/middlewares"
import { redirectSchema } from "@/infra/models"
import RedirectDB from "@/infra/models/db/redirect"
import { UnauthorizedError } from "@/infra/models/responses"
import withErrorInternal from "@/infra/utils/error"
import { ErrorKV, ErrorKVCode } from "@/infra/utils/kv_schema"
import ValidSchema from "@/infra/utils/valid_schema"
import validToken from "@/infra/utils/valid_token"
import { NextApiRequest, NextApiResponse } from "next"
import { createRouter } from "next-connect"

const router = createRouter<NextApiRequest, NextApiResponse>()
  .use(withLogging)
  .post(postHandle)

async function postHandle(req: NextApiRequest, res: NextApiResponse) {
  if(!validToken(req, res))
    return res.status(401).json(UnauthorizedError())

  if(!await ValidSchema(redirectSchema, { ...req.body }))
    return res.status(400).json({ error: "Bad request", message: "The request body is invalid." })

  try {
    const result = redirectSchema.parse(req.body)
    const id = Math.random().toString(36).substring(2)
    if(await RedirectDB.exist(id))
      return res.status(409).json({ error: "Conflict", message: "The redirect already exists." })
    await RedirectDB.save(result, id)
    res.status(200).json({ id, ...result })
  } catch (error) {
    if(error instanceof ErrorKV)
      if(error.code === ErrorKVCode.AlreadyExists)
        return res.status(409).json({ error: "Conflict", message: "The redirect already exists." })
    return withErrorInternal(error, req, res)
  }
}

export default router.handler({ onError: withErrorInternal })
