import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import * as MaterialIcons from "react-icons/md"

import Header from "@/components/Header"
import { TechType } from "@/infra/models/db/tech"
import Footer from "@/components/Footer"
import Error from "next/error"
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"

type props = {
  errorCode?: number,
  tech?: TechType,
}

export async function getServerSideProps({ req, query }: GetServerSidePropsContext): Promise<GetServerSidePropsResult<props>> {
  const res = await fetch(`http://${process.env.VERCEL_URL}/api/techs/${query.name}`)
  const errorCode = res.ok ? false : res.status

  if(errorCode != false)
    return { props: { errorCode } }

  const tech = await res.json()

  return {
    props: { tech },
  }
}

export default function Projects({ errorCode, tech }: props) {
  if(errorCode)
    return <Error statusCode={errorCode} />

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
        <Footer />
      </>
    )
}
