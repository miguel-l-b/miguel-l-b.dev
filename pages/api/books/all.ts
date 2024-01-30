import { withLogging } from "@/infra/middlewares"
import BookDB from "@/infra/models/db/book"
import withErrorInternal from "@/infra/utils/error"
import { NextApiRequest, NextApiResponse } from "next"
import { createRouter } from "next-connect"

const router = createRouter<NextApiRequest, NextApiResponse>()
  .use(withLogging)
  .get(getHandle)

async function getHandle(req: NextApiRequest, res: NextApiResponse) {
  try {
    res.status(200).json(await BookDB.getAll())
  } catch (error) {
    withErrorInternal(error, req, res)
  }
}

export default router.handler({ onError: withErrorInternal })
