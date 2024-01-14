import KVSchema from "@/infra/utils/kv_schema"
import { redirectType } from ".."

const RedirectDB = new KVSchema<redirectType>("redirect:", "redirect")
export default RedirectDB
