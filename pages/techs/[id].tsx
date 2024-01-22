import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import * as MaterialIcons from "react-icons/md"

import Header from "@/components/Header"
import { TechType } from "@/infra/models/db/tech"
import Footer from "@/components/Footer"
import { useRouter } from "next/router"

export default function Projects(): JSX.Element {
  const params = useRouter().query
  const [tech, setTech] = useState<TechType | undefined>(undefined)

  useEffect(() => {
    console.log(params.id)
    fetch(`/api/techs/${params.id}`)
      .then(res => res.json())
      .then(data => setTech(data))
  }, [params])

  useEffect(() => {
    console.log(tech)
  }, [tech])

  if(tech === undefined)
    return (
      <>
        <Header path="/techs" />
        <h1 className="text-center">Buscando...</h1>
      </>
    )
  return (
    <>
      <Head>
        <title>Miguel L B | {tech.name}</title>
        <meta name="description" content={tech.description} />
      </Head>
      <Header path="/techs" />
      <main className="flex flex-wrap items-center m-auto w-[65dvw] gap-12">
        <Image
            className="p-4 rounded-2xl bg-gray-dark shadow-lg shadow-black-dark"
            src={tech.img}
            width={100}
            height={100}
            alt={`foto de ${tech.name}`}
          />
        <h1 className="text-2xl">{tech.name}</h1>
        <div className="flex gap-2 px-1 overflow-x-auto">
          {
            tech.tags?.map((tag, index) => (
              <span key={index} className="bg-gray-dark px-2 my-1 rounded-md whitespace-nowrap">{tag}</span>
            ))
          }
        </div>
        <div className="flex gap-5">
          {
            tech.github && (
              <Link className="bg-white rounded-full" href={tech.github} target="_blank">
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                  width={30}
                  height={30}
                  alt="github icon"
                />
              </Link>
            )
          }
          {
            tech.site && (
              <Link href={tech.site} target="_blank">
                <MaterialIcons.MdLink className="text-gray" size={30} />
              </Link>
            )
          }
        </div>
        <p className="basis-full text-justify">{tech.description}</p>
      </main>
      <Footer />
    </>
  )
}
