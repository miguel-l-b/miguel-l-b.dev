import { TechType } from "@/infra/models/db/tech";
import Link from "next/link";
import Image from "next/image";

export interface techViewProps {
  content: TechType;
}

export default function TechView({ content }: techViewProps) {
  return (
    <Link
      className="flex flex-col relative w-fit transition-all delay-200 duration-200 items-center rounded-lg hover:rounded-t-xl bg-blue bg-opacity-15 hover:scale-150 justify-center p-2 group"
      href={`/techs/${content.name}`}
      aria-label={`Ir para a página da tecnologia ${content.name}`}
    >
      <Image
        className={`w-10 h-10`}
        src={content.img}
        width={40}
        height={40}
        alt={`icon da tecnologia ${content.name}`}
      />
      <span className="transition-all duration-100 opacity-0 z-50 shadow-sm shadow-black-dark bg-gray-dark px-2 absolute -bottom-0 group-hover:opacity-100 group-hover:-bottom-5 rounded-md whitespace-nowrap text-center min-w-16">
        {content.name}
      </span>
    </Link>
  );
}
