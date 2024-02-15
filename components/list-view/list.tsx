import { useContext } from "react"
import { ViewContext } from "."

export default function List() {
  const { content, limitPerPage, page } = useContext(ViewContext);

  return content.slice(page * limitPerPage, (page + 1) * limitPerPage)
}
