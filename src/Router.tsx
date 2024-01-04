import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Home from "./pages/Home"

export default function Router(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
