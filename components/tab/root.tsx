import React from "react"

export interface Props {
  className?: string
  children: React.ReactNode
}

export default function Tab({ children, ...props }: Props) {
  return (
    <div id="tab" {...props}>
      {children}
    </div>
  )
}
