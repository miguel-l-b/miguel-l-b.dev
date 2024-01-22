import { withLogging } from "@/infra/middlewares"
import LicenseDB from "@/infra/models/db/license"
import { UnauthorizedError } from "@/infra/models/responses"
import withErrorInternal from "@/infra/utils/error"
import ValidSchema from "@/infra/utils/valid_schema"
import validToken from "@/infra/utils/valid_token"
import { NextApiRequest, NextApiResponse } from "next"
import { createRouter } from "next-connect"

const router = createRouter<NextApiRequest, NextApiResponse>()
  .use(withLogging)
  .post(postHandler)

async function postHandler(req: NextApiRequest, res: NextApiResponse) {
  if(!validToken(req, res))
    return res.status(401).json(UnauthorizedError())
  try {
    const result = licenseSchema.parse(req.body)
    return res.status(201).json(await LicenseDB.create(result))
  } catch (error) {
    withErrorInternal(error, req, res)
  }
}

export default router.handler({ onError: withErrorInternal })
