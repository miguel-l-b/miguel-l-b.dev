import { withLogging } from "@/infra/middlewares"
import timelineDB from "@/infra/models/db/timeline"
import { NotFoundTimelineError } from "@/infra/models/responses"
import withErrorInternal from "@/infra/utils/error"
import { ErrorKV, ErrorKVCode } from "@/infra/utils/kv_schema"
import { NextApiRequest, NextApiResponse } from "next"
import { createRouter } from "next-connect"

const router = createRouter<NextApiRequest, NextApiResponse>()
  .use(withLogging)
  .get(getHandle)
  .delete(deleteHandle)

async function getHandle(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (!id)
    return res.status(404).json(NotFoundTimelineError("null"))

  try {
    return res.status(200).json(await timelineDB.get(id as string))
  } catch (error) {
    if(error instanceof ErrorKV)
      if(error.code === ErrorKVCode.NotFound)
        return res.status(404).json(NotFoundTimelineError(id as string))

    withErrorInternal(error, req, res)
  }
}

async function deleteHandle(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (!id)
    return res.status(404).json(NotFoundTimelineError("null"))

  try {
    await timelineDB.delete(id as string)
    return res.status(200).json({ message: "Deleted" })
  } catch (error) {
    if(error instanceof ErrorKV)
      if(error.code === ErrorKVCode.NotFound)
        return res.status(404).json(NotFoundTimelineError(id as string))

    withErrorInternal(error, req, res)
  }
}

export default router.handler({ onError: withErrorInternal })
