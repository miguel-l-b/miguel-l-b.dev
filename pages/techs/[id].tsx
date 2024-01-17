import Header from "@/components/Header"
import { techType } from "@/infra/models"
import Head from "next/head"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Projects(): JSX.Element {
  const params = useParams()
  const [tech, setTech] = useState<techType | undefined>(undefined)

  useEffect(() => {
    fetch(`/api/techs/${params.id}`)
      .then(res => res.json())
      .then(data => setTech(data))
  }, [params])

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
            src={tech.img}
            width={80}
            height={80}
            alt={`foto de ${tech.name}`}
          />
        <h1 className="text-2xl">{tech.name}</h1>
        <p className="basis-full text-justify">{tech.description}</p>
      </main>
    </>
  )
}
