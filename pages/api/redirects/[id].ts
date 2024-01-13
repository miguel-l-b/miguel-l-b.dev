import { withLogging } from "@/infra/middlewares"
import { NotFoundRedirectError } from "@/infra/models/responses"
import withErrorInternal from "@/infra/utils/error"
import validToken from "@/infra/utils/valid_token"
import { kv } from "@vercel/kv"
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

  const result = await kv.get<{id: string; url: string; name: string}>(id as string)

  if (!result)
    return res.status(404).json(NotFoundRedirectError(id as string))
  res.status(200).json(result)
}

async function deleteHandle(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if(!validToken(req, res))
    return res.status(401).json({ error: "Unauthorized", message: "You are not authorized to perform this action." })

  if (!id)
    return res.status(404).json(NotFoundRedirectError("null"))

  const result = await kv.del(id as string)

  if (!result)
    return res.status(404).json(NotFoundRedirectError(id as string))
  res.status(200).json(result)

}

export default router.handler({ onError: withErrorInternal })
