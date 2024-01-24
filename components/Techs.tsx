import { TechType } from "@/infra/models/db/tech"
import { useEffect, useState } from "react"
import TechView from "./techView"

export default function Techs() {
  const [techs, setTechs] = useState<Array<TechType & { id: string }>>([])

  const [languages, setLanguages] = useState<Array<TechType & { id: string }>>([])
  const [runners, setRunners] = useState<Array<TechType & { id: string }>>([])
  const [databases, setDatabases] = useState<Array<TechType & { id: string }>>([])
  const [others, setOthers] = useState<Array<TechType & { id: string }>>([])

  useEffect(() => {
    fetch('/api/techs/all')
      .then(async (res) => setTechs(await res.json()))
  }, [])

  useEffect(() => {
    techs.sort((a, b) => a.name < b.name? -1 : 1)
    if(techs.length > 0) {
      setLanguages(techs.filter(tech => tech.category === 'language'))
      setRunners(techs.filter(tech => tech.category === 'runner'))
      setDatabases(techs.filter(tech => tech.category === 'database'))
      setOthers(
        techs.filter(tech =>
          tech.category !== 'language' &&
          tech.category !== 'runner' &&
          tech.category !== 'database'
        )
      )
    }
  }, [techs])

  return (
  <>
    <div className={`flex flex-wrap w-full items-center justify-center gap-5`}>
      <h2 className={`text-xl font-extralight basis-full text-center`}>Linguagens:</h2>
      {
        languages.map((tech, index) => (
          <TechView key={index} content={tech} />
        ))
      }
    </div>
    <div className={`flex flex-wrap w-full items-center justify-center gap-5`}>
      <h2 className={`text-xl font-extralight basis-full text-center`}>Runners:</h2>
      {
        runners.map((tech, index) => (
          <TechView key={index} content={tech} />
        ))
      }
    </div>
    <div className={`flex flex-wrap w-full items-center justify-center gap-5`}>
      <h2 className={`text-xl font-extralight basis-full text-center`}>Bancos de dados:</h2>
      {
        databases.map((tech, index) => (
          <TechView key={index} content={tech} />
        ))
      }
    </div>
    <div className={`flex flex-wrap w-full items-center justify-center gap-5`}>
      <h2 className={`text-xl font-extralight basis-full text-center`}>Outros:</h2>
      {
        others.map((tech, index) => (
          <TechView key={index} content={tech} />
        ))
      }
    </div>
  </>
  )
}
