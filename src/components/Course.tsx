/* eslint-disable @typescript-eslint/no-non-null-assertion */

export default function Course(): JSX.Element {
  window.addEventListener("mousemove", (e) => {
    document.getElementById("cursor-outline")!.style.transform =
      `translate(calc(${e.clientX}px - 0.2rem), calc(${e.clientY}px - 0.2rem))`
    document.getElementById("cursor-dot")!.animate(
      {
        left: `calc(${e.clientX}px - 0.8rem)`,
        top: `calc(${e.clientY}px - 0.8rem)`,
      },
      { duration: 500, fill: "both" },
    )
  })
  return (
    <>
      <div
        id="cursor-dot"
        className="fixed top-[-7rem] left-[-7rem] z-[1] w-7 h-7 pointer-events-none border-inherit border-2 rounded-full"
      ></div>
      <div
        id="cursor-outline"
        className="fixed z-[1] pointer-events-none w-2 h-2 bg-white rounded-full"
      ></div>
    </>
  )
}
