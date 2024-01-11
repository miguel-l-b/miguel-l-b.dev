import { NextFetchEvent, NextRequest } from "next/server"
import { MiddlewareFactory } from "./types"

export const withLogging: MiddlewareFactory = (next) => {
  return async (req: NextRequest, _next: NextFetchEvent) => {
    if(req.nextUrl.pathname.startsWith('/api')) {
      console.time(`${req.ip}#${req.method} - ${req.url} in:`)
      next(req, _next)
      console.timeEnd(`${req.ip}#${req.method} - ${req.url} in:`)
    }
  }
}
