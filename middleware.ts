import { withLogging } from "./middlewares/logging"
import { stackMiddlewares } from "./middlewares/stackMiddlewares"

export default stackMiddlewares([withLogging])
