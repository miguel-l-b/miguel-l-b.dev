import KVSchema from "@/infra/utils/kv_schema"

const LicenseDB = new KVSchema("license:", "license")
export default LicenseDB
