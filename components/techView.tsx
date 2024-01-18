import { techType } from "@/infra/models"
import Link from "next/link"
import Image from "next/image"

export interface techViewProps {
  content: techType & { id: string }
}

export default function TechView({ content }: techViewProps) {
  return(
    <Link
      className="flex flex-col relative items-center hover:bg-gray hover:scale-150 justify-center p-2 rounded-t-xl group"
      href={`/techs/${content.id}`}
    >
      <Image
        className={`w-10 h-10`}
        src={content.img}
        width={40}
        height={40}
        alt={`icon da tecnologia ${content.name}`}
      />
      <span
        className="opacity-0 z-50 bg-gray-dark px-2 absolute -bottom-0 group-hover:opacity-100 group-hover:-bottom-5 rounded-md whitespace-nowrap text-center min-w-16">
          {content.name}
      </span>
    </Link>
  )
}
