import KVSchema from "@/infra/utils/kv_schema"
import { techType } from ".."

const TechDB = new KVSchema<techType>("tech:", "tech")
export default TechDB
