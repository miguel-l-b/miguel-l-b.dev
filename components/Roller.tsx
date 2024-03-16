import { useEffect, useState } from "react";

export interface RollerProps {
  delay?: number;
  values: Array<{ style: string; text: string }>;
}

export default function Roller(props: RollerProps) {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (index === 2) setIndex(0);
      else setIndex(index + (1 % props.values.length));
    }, props.delay || 2500);
    return () => clearInterval(interval);
  }, [index, props, props.delay, props.values.length]);
  return (
    <span
      className={`
        pl-3 pr-3 rounded-md transition-all ease-in duration-500 text-black
        text-nowrap select-none ${props.values[index]?.style}
      `}
    >
      {props.values[index]?.text}
    </span>
  );
}
