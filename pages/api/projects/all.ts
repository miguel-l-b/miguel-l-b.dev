import { createRouter } from "next-connect"
import { NextApiRequest, NextApiResponse } from "next"

import { withLogging } from "@/infra/middlewares"
import withErrorInternal from "@/infra/utils/error"
import ProjectDB from "@/infra/models/db/project"

const router = createRouter<NextApiRequest, NextApiResponse>()
  .use(withLogging)
  .get(getHandler)

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).json(await ProjectDB.find())
}

export default router.handler({ onError: withErrorInternal })
