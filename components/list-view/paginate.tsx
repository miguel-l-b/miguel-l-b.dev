import { useContext } from "react"
import { ViewContext } from "."
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"

export default function Paginate() {
  const { content, limitPerPage, page, setPage } = useContext(ViewContext)

  const pages = Array.from({ length: Math.ceil(content.length / limitPerPage) })

  return (
    <div className={`fixed flex z-10 bottom-14 right-14 rounded-lg py-3 bg-black-dark`}>
      <button
        className="px-4 py-2 hover:text-green-light"
        onClick={() => setPage(page - 1)}
        disabled={page === 0}
      >
        <FiChevronLeft />
      </button>
      <div className="rounded-lg bg-black-light">
        {
          pages.map((_, i) => (
            <button
              key={i}
              className={`px-4 py-4 rounded-lg ${page === i ? 'bg-green' : 'hover:bg-green-light'}`}
              onClick={() => setPage(i)}
            >
              {i + 1}
            </button>
          ))
        }
      </div>
      <button
        className="px-4 py-2 hover:text-green-light"
        onClick={() => setPage(page + 1)}
        disabled={page === Math.ceil(content.length / limitPerPage) - 1}
      >
        <FiChevronRight className="h-5 w-5" />
      </button>
    </div>
  )
}
