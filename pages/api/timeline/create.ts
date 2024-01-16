import { withLogging } from "@/infra/middlewares"
import { timelineSchema } from "@/infra/models"
import timelineDB from "@/infra/models/db/timeline"
import { BadRequestInvalidBodyError, UnauthorizedError } from "@/infra/models/responses"
import withErrorInternal from "@/infra/utils/error"
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
  if(!ValidSchema(timelineSchema, req.body))
    return res.status(400).json(BadRequestInvalidBodyError())

  try {
    const result = timelineSchema.parse(req.body)
    await timelineDB.save(result)
    return res.status(200).json(result)
  } catch (error) {
    return withErrorInternal(error, req, res)
  }

}

export default router.handler({ onError: withErrorInternal })
