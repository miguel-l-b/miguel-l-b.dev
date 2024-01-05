/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { useEffect, useState } from "react"

export default function Curse(): JSX.Element {
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    const checkTouchDevice = (): void => {
      setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0)
    }

    // Adiciona um listener para o evento 'touchstart'
    window.addEventListener("touchstart", checkTouchDevice)

    // Remove o listener quando o componente é desmontado
    return () => {
      window.removeEventListener("touchstart", checkTouchDevice)
    }
  }, [])

  window.addEventListener("click", () => {
    document.getElementById("cursor-dot")!.animate(
      {
        width: "5rem",
        height: "5rem",
        transform: "translate(-1.625rem, -1.625rem)",
        background: "#E6EEEF50",
      },
      { duration: 100, fill: "both" },
    )

    setTimeout(() => {
      document.getElementById("cursor-dot")!.animate(
        {
          width: "1.75rem",
          height: "1.75rem",
          background: "none",
          transform: "translate(0.025rem, 0.025rem)",
        },
        { duration: 580, fill: "both" },
      )
    }, 500)
  })
  window.addEventListener("mousemove", (e) => {
    document.getElementById("cursor-outline")!.style.left =
      `calc(${e.clientX}px - 0.2rem)`
    document.getElementById("cursor-outline")!.style.top =
      `calc(${e.clientY}px - 0.2rem)`
    document.getElementById("cursor-dot")!.animate(
      {
        left: `calc(${e.clientX}px - 0.8rem)`,
        top: `calc(${e.clientY}px - 0.8rem)`,
      },
      { duration: 500, fill: "both" },
    )
  })

  if (isTouchDevice) return <></>
  return (
    <>
      <div
        id="cursor-dot"
        className="fixed top-[-7rem] left-[-7rem] z-[1] w-7 h-7 pointer-events-none border-white border-2 rounded-full"
      ></div>
      <div
        id="cursor-outline"
        className="fixed z-[1] pointer-events-none w-2 h-2 backdrop-invert bg-[#E6EEEF50] rounded-full"
      ></div>
    </>
  )
}
