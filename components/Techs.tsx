import { techType } from "@/infra/models"
import { useEffect, useState } from "react"
import TechView from "./techView"

export default function Techs() {
  const [techs, setTechs] = useState<Array<techType & { id: string }>>([])

  const [languages, setLanguages] = useState<Array<techType & { id: string }>>([])
  const [runners, setRunners] = useState<Array<techType & { id: string }>>([])
  const [databases, setDatabases] = useState<Array<techType & { id: string }>>([])
  const [others, setOthers] = useState<Array<techType & { id: string }>>([])

  useEffect(() => {
    fetch('/api/techs/all')
      .then(async (res) => setTechs(await res.json()))
  }, [])

  useEffect(() => {
    setLanguages(techs.filter(tech => tech.tags.includes('language')))
    setRunners(techs.filter(tech => tech.tags.includes('runner')))
    setDatabases(techs.filter(tech => tech.tags.includes('database')))
    setOthers(
      techs.filter(tech =>
        !tech.tags.includes('language') &&
        !tech.tags.includes('runner') &&
        !tech.tags.includes('database')
      )
    )
  }, [techs])

  return (
  <>
    {/* <div className={`flex flex-wrap w-full items-center justify-center gap-5`}>
      <h2 className={`text-xl font-extralight basis-full text-center`}>Linguagens:</h2>
      {
        languages.map((tech, index) => (
          <Link key={index} href={`/techs/${tech.id}`}>
            <Image
              className={`w-10 h-10`}
              src={tech.img}
              width={40}
              height={40}
              alt={`icon da tecnologia ${tech.name}`}
            />
          </Link>
        ))
      }
    </div>
    <div className={`flex flex-wrap w-full items-center justify-center gap-5`}>
      <h2 className={`text-xl font-extralight basis-full text-center`}>Runners:</h2>
      {
        runners.map((tech, index) => (
          <Link key={index} href={`/techs/${tech.id}`}>
            <Image
              className={`w-10 h-10`}
              src={tech.img}
              width={40}
              height={40}
              alt={`icon da tecnologia ${tech.name}`}
            />
          </Link>
        ))
      }
    </div>
    <div className={`flex flex-wrap w-full items-center justify-center gap-5`}>
      <h2 className={`text-xl font-extralight basis-full text-center`}>Bancos de dados:</h2>
      {
        databases.map((tech, index) => (
          <Link key={index} href={`/techs/${tech.id}`}>
            <Image
              className={`w-10 h-10`}
              src={tech.img}
              width={40}
              height={40}
              alt={`icon da tecnologia ${tech.name}`}
            />
          </Link>
        ))
      }
    </div> */}
    <div className={`flex flex-wrap w-full items-center justify-center gap-5`}>
      {/* <h2 className={`text-xl font-extralight basis-full text-center`}>Outros:</h2> */}
      {
        others.map((tech, index) => (
          <TechView key={index} content={tech} />
        ))
      }
    </div>
  </>
  )
}
