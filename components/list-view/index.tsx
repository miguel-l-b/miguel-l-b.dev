import React, { useEffect, useState } from "react"
import List from "./list"
import Paginate from "./paginate"

export interface ViewProps {
  content: React.ReactNode[]
  limitPerPage?: number
  page?: number
  className?: string
}

export interface ViewContextProps {
  content: React.ReactNode[]
  limitPerPage: number
  page: number
  setPage: (page: number) => void
}

export const ViewContext = React.createContext<ViewContextProps>({
  content: [],
  limitPerPage: 0,
  page: 0,
  setPage: () => {}
})

export function ViewProvider({ children, content, limitPerPage }: { children: React.ReactNode, content: React.ReactNode[], limitPerPage: number }) {
  const [page, setPage] = useState(0)

  return (
    <ViewContext.Provider value={{ content, limitPerPage, page, setPage }}>
      {children}
    </ViewContext.Provider>
  )
}

export default function ListViewController({ content, page: p, limitPerPage, className }: ViewProps) {
  return (
    <ViewProvider content={content} limitPerPage={limitPerPage || 10}>
      <div className={className}>
        <List />
        <Paginate />
      </div>
    </ViewProvider>
  )
}
