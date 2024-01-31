import Image from 'next/image'
import Head from 'next/head'
import { useRouter } from 'next/router'
import * as MaterialIcons from "react-icons/md"

import Header from '@/components/Header'
import TimeLine from '@/components/timeline'
import Roller from '@/components/Roller'
import Link from 'next/link'
import Techs from '@/components/Techs'
import Footer from '@/components/Footer'
import Share from '@/components/Share'

export default function Home() {
  const router = useRouter()

  return (
    <>
    <Head>
      <title>Miguel L B | Home</title>
      <meta name="description" content="🧑‍💻 Desenvolvendo aplicações Web e Mobile desde 2020" />
    </Head>
    <Header path="/" />
    <main className="text-center mt-20">
      <Image
        className="w-52 h-52 m-auto"
        src="/img/logo-ellipse.svg"
        width={208}
        height={208}
        alt="logo tipo"
      />
      <br />
      <h1>Olá 🖖, eu sou <Roller values={[
          {text: "Miguel Lopes Braido", style: "bg-green text-xl"},
          {text: "Desenvolvedor de Software", style: "bg-blue text-xl"},
          {text: "Desenvolvedor FullStack", style: "bg-yellow text-xl"}
      ]} /></h1>
      <button
        onClick={() => router.push("/cv.pdf")}
        className="m-auto flex items-center gap-5 border-blue border-4 text-blue font-bold rounded-full px-4 py-2 mt-10 hover:bg-blue-dark"
      >
        Ver meu CV <MaterialIcons.MdOutlineFileDownload className='text-2xl' />
      </button>
      <Share className="mx-auto mt-8" />
      <br />
      <br />
      <h1>🧑‍💻 Desenvolvendo aplicações Web e Mobile desde 2020</h1>
      <h1>
        🎓 Cursando Desenvolvimento de Sistemas pelo{" "}
        <Link
          className="animated-link"
          href="https://cotuca.unicamp.br/"
          target="_blank"
        >
          COTUCA - Unicamp
        </Link>
      </h1>
      <h1>🧐 Estou de olho no Deno e Bun</h1>
      <h1>🚀 Buscando oportunidade de estágio</h1>
      <Link href="#timeline">
        <MaterialIcons.MdOutlineDownloading  className="m-auto mt-20 text-5xl animate-bounce" />
      </Link>
    </main>
    <section id="techs" className="flex flex-col justify-center items-center gap-20 mt-40 w-full min-h-screen bg-black-dark">
      <h1 className="text-2xl text-center mt-10 basis-full">
        <Link href="#techs">
          Tecnologias que utilizo e estudo
        </Link>
      </h1>
      <Techs />
    </section>
    <section id="timeline" className="flex flex-col justify-center py-20 min-h-[50dvh] rounded-md">
      <h1 className="text-center text-2xl font-orbitron font-extrabold text-gray-light mb-10">
        <Link href="#timeline">Linha do Tempo</Link>
      </h1>
      <TimeLine.root />
    </section>
    <Footer />
  </>
  )
}
