import { useState } from "react"
import { LuConstruction } from "react-icons/lu"
export default function Building() {
  const [isBuilding, setIsBuilding] = useState(true)
  return (
    <button
    onClick={() => setIsBuilding(!isBuilding)}
    className={`
      ${isBuilding ? "opacity-100 h-auto w-auto" : "opacity-0 -top-56"}
      z-50
      group fixed right-10 -top-2 flex flex-wrap justify-center items-center py-3 px-5
      rounded-b-xl transform transition-all animate-attention duration-50 ease-in hover:animate-none
      bg-yellow-dark text-2xl text-center text-yellow-light
      `
    }
    >
      <LuConstruction />
      {"..."}
      <h1
        className="basis-full group-hover:opacity-100 group-hover:h-auto group-hover:w-auto transition-all duration-500 opacity-0 h-0"
      >
        Em Construção!
      </h1>
    </button>
  )
}
