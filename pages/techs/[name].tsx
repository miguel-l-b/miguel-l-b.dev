import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import * as MaterialIcons from "react-icons/md"

import Header from "@/components/Header"
import { TechType } from "@/infra/models/db/tech"
import Footer from "@/components/Footer"
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import ErrorNotFound from "../404"
import getBaseUrl from "@/infra/utils/url"

type props = {
  errorCode?: number,
  tech?: TechType,
}

export async function getServerSideProps({ query }: GetServerSidePropsContext): Promise<GetServerSidePropsResult<props>> {
  console.log(getBaseUrl())
  const res = await fetch(`${getBaseUrl()}/api/techs/${query.name}`)
  const errorCode = res.status >= 200 && res.status <= 399 ? false : res.status

  if(errorCode != false)
    return { props: { errorCode } }

  const tech = await res.json()

  return {
    props: { tech },
  }
}

export default function Projects({ errorCode, tech }: props) {
  if(tech)
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
        {/* <section id="projects" className="flex flex-col flex-wrap w-full gap-5 p-10 mt-20 bg-black-dark items-center">
          <h1 className="basis-full">Projetos:</h1>
          <div className="bg-gradient-to-tr to-gray-dark to-95% from-blue-dark p-2 rounded-md hover:scale-110">
            <Image src="" className="w-48 bg-slate-500 rounded-md" width={1920} height={720} alt="thumb of" />
            <h2>title</h2>
            <h3>description</h3>
          </div>
        </section> */}
        <Footer />
      </>
    )
  if(errorCode)
    return <ErrorNotFound />
}
