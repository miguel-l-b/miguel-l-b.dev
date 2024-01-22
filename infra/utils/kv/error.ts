export enum ErrorKVCode {
  NotFound = 404,
  AlreadyExists = 409,
  Invalid = 422,
  Unknown = 500,
  Schema = 501,
}

export class ErrorKV extends Error {
  public readonly code: ErrorKVCode
  constructor(message: string, code: ErrorKVCode) {
    super(message)
    this.name = "ErrorKV"
    this.code = code
  }

  getError() {
    return {
      code: this.code,
      message: this.message,
    }
  }
}
