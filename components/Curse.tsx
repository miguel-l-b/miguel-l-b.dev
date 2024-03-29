'use client'
import { useEffect, useState } from "react"

export default function Curse(): JSX.Element {
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    const checkTouchDevice = (): void => {
      setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0)
    }

    window.addEventListener("touchstart", checkTouchDevice)

    window.addEventListener("click", () => {
      document.getElementById("cursor-dot")?.animate(
        {
          width: "5rem",
          height: "5rem",
          background: "#E6EEEF50",
          borderRadius: "100%",
          transform: "translate(-1.625rem, -1.625rem)",
        },
        { duration: 100, fill: "both" },
      )

      setTimeout(() => {
        document.getElementById("cursor-dot")?.animate(
          {
            width: "1.75rem",
            height: "1.75rem",
            background: "none",
            borderRadius: "0.6rem",
            transform: "translate(0.025rem, 0.025rem)",
          },
          { duration: 580, fill: "both" },
        )
      }, 120)
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
        { duration: 100, fill: "both" },
      )
    })

    return () => {
      window.removeEventListener("touchstart", checkTouchDevice)
    }
  }, [])
  if (isTouchDevice) return <></>
  return (
    <>
      <div
        id="cursor-dot"
        className="fixed top-[-7rem] left-[-7rem] z-[999] w-7 h-7 pointer-events-none border-white border-2 rounded-[0.6rem]"
      ></div>
      <div
        id="cursor-outline"
        className="fixed z-[999] top-[-7rem] left-[-7rem] pointer-events-none w-2 h-2 backdrop-invert bg-[#E6EEEF50] rounded-full"
      ></div>
    </>
  )
}
