import { withLogging } from "@/infra/middlewares"
import RedirectDB, { RedirectType, redirectSchema } from "@/infra/models/db/redirect"
import { UnauthorizedError } from "@/infra/models/responses"
import withErrorInternal from "@/infra/utils/error"
import { ErrorKV, ErrorKVCode } from "@/infra/utils/kv"
import ValidSchema from "@/infra/utils/valid_schema"
import validToken from "@/infra/utils/valid_token"
import { NextApiRequest, NextApiResponse } from "next"
import { createRouter } from "next-connect"

const router = createRouter<NextApiRequest, NextApiResponse>()
  .use(withLogging)
  .post(postHandle)

async function postHandle(req: NextApiRequest, res: NextApiResponse) {
  const { name, url } = req.body
  // if(!validToken(req, res))
  //   return res.status(401).json(UnauthorizedError())

  const id: string = Math.random().toString(36).substring(2)
  try {
    if(!await ValidSchema<RedirectType>(redirectSchema, { id, name, url }))
      return res.status(400).json({ error: "Bad request", message: "The request body is invalid." })

    const result = redirectSchema.parse({
      id,
      name,
      url,
    })
    await RedirectDB.create({
      ...result,
    })
    res.status(200).json({ ...result })
  } catch (error) {
    if(error instanceof ErrorKV)
      if(error.code === ErrorKVCode.AlreadyExists)
        return res.status(409).json({ error: "Conflict", message: "The redirect already exists." })
    return withErrorInternal(error, req, res)
  }
}

export default router.handler({ onError: withErrorInternal })
