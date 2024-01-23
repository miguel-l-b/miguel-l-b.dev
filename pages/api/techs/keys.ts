import { withLogging } from "@/infra/middlewares"
import TechDB from "@/infra/models/db/tech"
import withErrorInternal from "@/infra/utils/error"
import { NextApiRequest, NextApiResponse } from "next"
import { createRouter } from "next-connect"

const router = createRouter<NextApiRequest, NextApiResponse>()
  .use(withLogging)
  .get(getHandle)

async function getHandle(req: NextApiRequest, res: NextApiResponse) {
  console.log("getHandle")
  return res.status(200).json(await TechDB.getKeys())
}

export default router.handler({ onError: withErrorInternal })
