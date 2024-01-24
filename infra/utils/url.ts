const getBaseUrl = () => {
  if (process.env.NODE_ENV === "development") {
     return "http://localhost:3000"
   }

  return "https://miguellb.net"
}

export default getBaseUrl
