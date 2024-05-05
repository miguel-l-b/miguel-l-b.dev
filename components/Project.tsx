import Link from "next/link";
import { FiGithub } from "react-icons/fi";

import { ProjectType } from "@/infra/models/db/project";

export default function Project(props: ProjectType): JSX.Element {
  return (
    <div
      className={`
        py-3 rounded-xl w-fit
        bg-gradient-to-bl from-[#4a5560bf] to-[#2f457240]
      `}
    >
      <header className="w-full flex gap-1.5 pb-4 px-2">
        <span className="block bg-red w-3 h-3 rounded-full" />
        <span className="block bg-yellow w-3 h-3 rounded-full" />
      </header>
      <main className="px-5">
        <img className="w-full" src={props.img} alt={props.name} />
        <h1>{props.name}</h1>
        <p>{props.description}</p>
        <div className="flex gap-4">
          {props.demo_url && (
            <Link
              className={`
                block w-fit px-2 py-1 bg-green rounded-xl text-lg
                hover:bg-gradient-to-l
                hover:from-green-light hover:to-green-dark
              `}
              href={props.demo_url}
            >
              Ver demo
            </Link>
          )}
          {props.github && (
            <Link
              className={`
                block w-fit bg-black-dark p-2 rounded-xl text-xl
                hover:bg-gradient-to-l
                hover:from-black-light hover:to-black-dark
              `}
              href={props.github}
            >
              <FiGithub className="text-blue-light" />
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}
