import {  createRouter } from "next-connect"
import { withLogging } from "@/infra/middlewares"
import { UnauthorizedError } from "@/infra/models/responses"
import { NextApiRequest, NextApiResponse } from "next"
import withErrorInternal from "@/infra/utils/error"
import validToken from "@/infra/utils/valid_token"
import RedirectDB from "@/infra/models/db/redirect"

const router = createRouter<NextApiRequest, NextApiResponse>()
  .use(withLogging)
  .get(getHandle)

async function getHandle(req: NextApiRequest, res: NextApiResponse) {
  if(!validToken(req, res))
    return res.status(401).json(UnauthorizedError())

  try {
    return res.status(200).json(await RedirectDB.getAll())
  } catch (error) {
    return withErrorInternal(error, req, res)
  }
}

export default router.handler({ onError: withErrorInternal })
