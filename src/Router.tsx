import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Course from "./components/Course"
import Books from "./pages/Books"
import Home from "./pages/Home"

export default function Router(): JSX.Element {
  return (
    <>
      <Course />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
