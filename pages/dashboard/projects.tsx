import HeaderDash from "@/components/HeaderDash"
import Tab from "@/components/tab"
import { ProjectType } from "@/infra/models/db/project"
import Head from "next/head"
import { useState } from "react"
import * as MaterialIcons from "react-icons/md"

export default function Projects() {
  const [content, setContent] = useState<ProjectType>({
    slug: "",
    img: "",
    name: "",
    description: "",
    license: "",
    github: "",
    demo_url: "",
    tags: [],
    techs: [],
  })
  return (
  <main className="flex items-center">
    <Head>
      <title>Dashboard | Projetos</title>
    </Head>
    <HeaderDash />
    <Tab.root className="mx-10 p-5 w-full h-fit rounded-xl bg-gray-dark bg-opacity-25">
      <Tab.list>
        <Tab.label value="form"><MaterialIcons.MdEditDocument /></Tab.label>
        <Tab.label value="view"><MaterialIcons.MdPreview /></Tab.label>
      </Tab.list>
      <Tab.content id="form">
        <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
          <div className="pl-1 flex items-center">
            <h1>https://miguellb.net/projects/</h1>
            <input
              type="text"
              placeholder="Slug..."
              className="px-5 rounded-lg bg-gray-dark bg-opacity-50 text-white"
              value={content.slug}
              onChange={e => setContent({ ...content, slug: e.target.value })}
            />
          </div>
          <input
            type="url"
            placeholder="Imagem..."
            value={content.img}
            onChange={e => setContent({ ...content, img: e.target.value })}
          />
          <input
            type="text"
            placeholder="Nome..."
            value={content.name}
            onChange={e => setContent({ ...content, name: e.target.value })}
          />
          <textarea
            placeholder="Descrição..."
            value={content.description}
            onChange={e => setContent({ ...content, description: e.target.value })}
          />
          <select
            value={content.license}
            onChange={e => setContent({ ...content, license: e.target.value })}
          >
            <option selected hidden>Licença...</option>
            <option value="MIT">MIT</option>
            <option value="Apache">Apache</option>
            <option value="GPL">GPL</option>
            <option value="BSD">BSD</option>
          </select>
          <input
            type="text"
            placeholder="Tags..."
            value={content.tags.join(",")}
            onChange={e => setContent({ ...content, tags: e.target.value.split(",") })}
          />
          <div className="flex gap-5">
            <select>
              <option selected hidden>Techs...</option>
              <option value="React">React</option>
              <option value="Vue">Vue</option>
              <option value="Angular">Angular</option>
              <option value="Svelte">Svelte</option>
            </select>
            <button
              type="button"
              className="bg-blue px-4 rounded-lg transition-all duration-200 hover:bg-blue-dark"
              onClick={() => {
                setContent({ ...content, techs: [...content.techs, "React"] })
              }}
            >
              <MaterialIcons.MdAdd />
            </button>
          </div>
          <div className="flex flex-wrap gap-5 justify-center">
          {
            content.techs.map((tech, key) => (
                <button
                  key={key}
                  type="button"
                  className="bg-yellow text-black-dark px-4 rounded-lg transition-all duration-200 hover:bg-red-light"
                  onClick={() => {
                    const techs = [...content.techs]
                    techs.splice(key, 1)
                    setContent({ ...content, techs })
                  }}
                  >
                  <h1>{tech}</h1>
                </button>
            ))
          }
          </div>
          <input
            type="url"
            placeholder="GitHub..."
            value={content.github}
            onChange={e => setContent({ ...content, github: e.target.value })}
          />
          <input
            type="url"
            placeholder="Demo..."
            value={content.demo_url}
            onChange={e => setContent({ ...content, demo_url: e.target.value })}
          />
        </form>
      </Tab.content>
      <Tab.content id="view">
        <h1 className="text-3xl font-bold">View</h1>
      </Tab.content>
      <button
        className={`
          w-full mt-5 py-2 rounded-xl text-xl font-bold bg-blue
          transition duration-300 ease-in-out
          hover:scale-[98%] hover:bg-blue-dark hover:text-blue-light
        `}
      >
        Criar
      </button>
    </Tab.root>
  </main>
  )
}
