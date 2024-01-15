import { withLogging } from "@/infra/middlewares"
import RedirectDB from "@/infra/models/db/redirect"
import { NotFoundRedirectError, UnauthorizedError } from "@/infra/models/responses"
import withErrorInternal from "@/infra/utils/error"
import { ErrorKV, ErrorKVCode } from "@/infra/utils/kv_schema"
import validToken from "@/infra/utils/valid_token"
import { NextApiRequest, NextApiResponse } from "next"
import { createRouter } from "next-connect"

const router = createRouter<NextApiRequest, NextApiResponse>()
  .use(withLogging)
  .get(getHandle)
  .delete(deleteHandle)

async function getHandle(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (!id)
    return res.status(404).json(NotFoundRedirectError("null"))

  try {
    res.status(200).json(await RedirectDB.get(id as string))
  } catch (error) {
    if(error instanceof ErrorKV)
      if(error.code === ErrorKVCode.NotFound)
        return res.status(404).json(NotFoundRedirectError(id as string))

    return withErrorInternal(error, req, res)
  }
}

async function deleteHandle(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if(!validToken(req, res))
    return res.status(401).json(UnauthorizedError())

  if (!id)
    return res.status(404).json(NotFoundRedirectError("null"))

  try {
    await RedirectDB.delete(id as string)
    res.status(200).json({ message: "Deleted" })
  } catch (error) {
    if(error instanceof ErrorKV)
      if(error.code === ErrorKVCode.NotFound)
        return res.status(404).json(NotFoundRedirectError(id as string))

    return withErrorInternal(error, req, res)
  }
}

export default router.handler({ onError: withErrorInternal })
