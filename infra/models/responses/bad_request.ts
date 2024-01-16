export const BadRequestError = () => {
  return {
    error: "Bad Request",
    message: "The request is invalid.",
  }
}

export const BadRequestWithMessageError = (message: string) => {
  return {
    error: "Bad Request",
    message,
  }
}

export const BadRequestInvalidBodyError = () => {
  return BadRequestWithMessageError("The request body is not valid")
}
