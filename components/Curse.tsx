"use client";
import { useEffect, useState } from "react";

export default function Curse(): JSX.Element {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouchDevice = (): void => {
      setIsTouchDevice(
        "ontouchstart" in window || navigator.maxTouchPoints > 0
      );
    };

    let cursorHovered = false;

    const cursorDot = document.getElementById("cursor-dot");
    const cursorOutline = document.getElementById("cursor-outline");

    window.addEventListener("touchstart", checkTouchDevice);

    window.addEventListener("click", () => {
      cursorHovered = false;
      cursorOutline!.style.opacity = "1";
      cursorDot!.animate(
        {
          width: "5rem",
          height: "5rem",
          background: "#E6EEEF50",
          borderRadius: "100%",
          transform: "translate(-1.625rem, -1.625rem)",
        },
        { duration: 100, fill: "both" }
      );

      setTimeout(() => {
        cursorDot!.animate(
          {
            width: "1.75rem",
            height: "1.75rem",
            background: "none",
            borderRadius: "0.6rem",
            transform: "translate(0.025rem, 0.025rem)",
          },
          { duration: 580, fill: "both" }
        );
      }, 120);
    });
    window.addEventListener("mousemove", (e) => {
      if (!cursorHovered) {
        cursorOutline!.style.left = `calc(${e.clientX}px - 0.2rem)`;
        cursorOutline!.style.top = `calc(${e.clientY}px - 0.2rem)`;
        document.getElementById("cursor-dot")!.animate(
          {
            left: `calc(${e.clientX}px - 0.8rem)`,
            top: `calc(${e.clientY}px - 0.8rem)`,
          },
          { duration: 100, fill: "both" }
        );
      }
    });

    document.querySelectorAll(".course_block, .course_circle").forEach((el) => {
      el.addEventListener("mouseenter", (e) => {
        cursorHovered = true;
        el.classList.contains("course_block")
          ? cursorDot!.animate(
              {
                top: `calc(${el.getBoundingClientRect().top}px - 5px)`,
                left: `calc(${el.getBoundingClientRect().left}px - 10px)`,
                width: `${el.getBoundingClientRect().width + 20}px`,
                height: `${el.getBoundingClientRect().height + 10}px`,
                background: "#ffffff50",
              },
              { duration: 500, fill: "both" }
            )
          : el.classList.contains("course_circle")
          ? cursorDot!.animate(
              {
                top: `calc(${el.getBoundingClientRect().top}px - 0.75rem)`,
                left: `calc(${el.getBoundingClientRect().left}px - 0.75rem)`,
                width: `calc(${el.getBoundingClientRect().width}px + 1.5rem)`,
                height: `calc(${el.getBoundingClientRect().height}px + 1.5rem)`,
                borderRadius: "100%",
              },
              { duration: 500, fill: "both" }
            )
          : {};
        cursorOutline!.style.opacity = "0";
      });
      el.addEventListener("mouseleave", (e) => {
        cursorHovered = false;
        cursorDot!.animate(
          {
            width: "1.75rem",
            height: "1.75rem",
            background: "none",
            borderRadius: "0.6rem",
          },
          { duration: 300, fill: "both" }
        );
        cursorOutline!.style.opacity = "1";
      });
    });

    return () => {
      window.removeEventListener("touchstart", checkTouchDevice);
    };
  }, []);
  if (isTouchDevice) return <></>;
  return (
    <>
      <div
        id="cursor-dot"
        className={`
          fixed top-[-7rem] left-[-7rem] z-[999] w-7 h-7 pointer-events-none
          border-white border-2 rounded-[0.6rem] has-[a:hover]:bg-blue
        `}
      ></div>
      <div
        id="cursor-outline"
        className={`
          fixed z-[999] top-[-7rem] left-[-7rem] pointer-events-none w-2 h-2
          backdrop-invert bg-[#E6EEEF50] rounded-full
        `}
      ></div>
    </>
  );
}
