import { withLogging } from "@/infra/middlewares"
import LicenseDB from "@/infra/models/db/license"
import withErrorInternal from "@/infra/utils/error"
import { NextApiRequest, NextApiResponse } from "next"
import { createRouter } from "next-connect"

const router = createRouter<NextApiRequest, NextApiResponse>()
  .use(withLogging)
  .get(getHandle)

async function getHandle(req: NextApiRequest, res: NextApiResponse) {
  try {
    res.status(200).json(await LicenseDB.find())
  } catch (error) {
    withErrorInternal(error, req, res)
  }
}

export default router.handler({ onError: withErrorInternal })
