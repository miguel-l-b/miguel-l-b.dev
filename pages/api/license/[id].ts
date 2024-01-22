import { withLogging } from "@/infra/middlewares"
import LicenseDB from "@/infra/models/db/license"
import { NotFoundLicenseError } from "@/infra/models/responses"
import withErrorInternal from "@/infra/utils/error"
import { NextApiRequest, NextApiResponse } from "next"
import { createRouter } from "next-connect"

const router = createRouter<NextApiRequest, NextApiResponse>()
  .use(withLogging)
  .get(getHandle)
  .delete(deleteHandle)

async function getHandle(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (!id)
    return res.status(400).json(NotFoundLicenseError("null"))

  return res.status(200).json(await LicenseDB.findById(id as string))
}

async function deleteHandle(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (!id)
    return res.status(400).json(NotFoundLicenseError("null"))

  await LicenseDB.findByIdAndDelete(id as string)
  return res.status(200).json({ message: "License deleted" })
}

export default router.handler({ onError: withErrorInternal })
