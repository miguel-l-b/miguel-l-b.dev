import { useState } from "react"

export interface NodeProps {
  date: string;
  onClick: () => void;
  isActive: boolean;
}

export default function Node(props: NodeProps) {
  return (
    <div className="flex items-center transition-all flex-col md:flex-row" onClick={props.onClick}>
      <div className={`w-10 h-10 z-10 rounded-full border-blue-dark border-8 duration-300 ${props.isActive && "bg-blue-dark border-x-blue animate-spin"}`} />
      <div className={`h-6 w-1 md:w-6 md:h-1 bg-blue-light rounded-full my-2 md:mx-2 duration-300 ${props.isActive && "w-3 h-12 md:w-12 md:h-3"}`} />
      <h4 className={`text-blue-light ${props.isActive && "text-xl"}`}>{props.date}</h4>
    </div>
  );
}
