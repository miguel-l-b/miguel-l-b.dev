import { withLogging } from "@/infra/middlewares"
import timelineDB from "@/infra/models/db/timeline"
import withErrorInternal from "@/infra/utils/error"
import { NextApiRequest, NextApiResponse } from "next"
import { createRouter } from "next-connect"

const router = createRouter<NextApiRequest, NextApiResponse>()
  .use(withLogging)
  .get(getHandle)

async function getHandle(req: NextApiRequest, res: NextApiResponse) {
  try {
    return res.status(200).json(await timelineDB.getAll())
  } catch (error) {
    withErrorInternal(error, req, res)
  }
}

export default router.handler({ onError: withErrorInternal })
