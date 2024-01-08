import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Curse from "./components/Curse"
import ErrorNotFound from "./pages/404"
import Books from "./pages/Books"
import Home from "./pages/Home"
import Projects from "./pages/Projects"

export default function Router(): JSX.Element {
  return (
    <>
      <Curse />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/*" element={<ErrorNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
