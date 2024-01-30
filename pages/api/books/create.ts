import { withLogging } from "@/infra/middlewares"
import BookDB, { bookSchema } from "@/infra/models/db/book"
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
  try {
    if(!validToken(req, res))
      return res.status(401).json(UnauthorizedError())

    if(!ValidSchema(bookSchema, req.body))
      return res.status(400).json({ error: "Invalid body" })

    const result = await bookSchema.parseAsync(req.body)
    await BookDB.create(result)
    return res.status(201).json(result)
  } catch (error) {
    withErrorInternal(error, req, res)
  }
}

export default router.handler({ onError: withErrorInternal })
