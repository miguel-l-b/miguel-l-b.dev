export const NotFoundError = () => ({
  error: "Not found",
  message: "The redirect is not found."
})

export const NotFoundRedirectError = (id: string) => ({
  error: "Not found",
  message: `The redirect ${id} is not found.`
})

export const NotFoundTimelineError = (id: string) => ({
  error: "Not found",
  message: `The timeline ${id} is not found.`
})

export const NotFoundLicenseError = (id: string) => ({
  error: "Not found",
  message: `The license ${id} is not found.`
})

export const NotFoundTechError = (id: string) => ({
  error: "Not found",
  message: `The tech ${id} is not found.`
})

export const NotFoundCustomMsgError = (message: string) => ({
  error: "Not found",
  message: message
})
