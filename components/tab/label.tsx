import Link from "next/link";
import { useSearchParams } from "next/navigation";

export interface LabelProps {
  children: React.ReactNode;
  value: string;
  className?: string;
}

export default function Label({ children, value, className = "" }: LabelProps) {
  const params = useSearchParams();
  return (
    <Link
      href={`?tab=${value}`}
      className={`
        flex justify-center w-1/3 text-2xl font-bold text-gray-500 bg-black rounded-lg py-1
        transition duration-300 ease-in-out
        hover:scale-110 hover:bg-gray hover:text-black hover:font-medium hover:shadow-lg
        ${
          params.get("tab") === value
            ? "scale-90 bg-gray text-black font-medium shadow-lg"
            : ""
        }
        ${className}
      `}
    >
      {children}
    </Link>
  );
}
