import KVSchema from "@/infra/utils/kv_schema"
import { timelineType } from ".."

const timelineDB = new KVSchema<timelineType>("timeline:", "timeline")
export default timelineDB
