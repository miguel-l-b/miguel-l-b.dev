import Image from 'next/image'
import Head from 'next/head'
import Header from '@/components/Header'
import { useEffect, useState } from 'react'

const texts = [
  {text: "Miguel Lopes B.", style: "bg-green text-xl"},
  {text: "Desenvolvedor de Software", style: "bg-blue text-xl"},
  {text: "Desenvolvedor FullStack", style: "bg-yellow text-xl"},
]

export default function Home() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if(index === 2) setIndex(0)
      else
      setIndex((index + 1 % 3))
    }, 2500)
    return () => clearInterval(interval)
  }, [index])

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
      <h1>Olá 🖖, eu sou <span className={`pl-3 pr-3 rounded-md transition-all ease-in duration-500 text-black ${texts[index]?.style}`}>{texts[index]?.text}</span></h1>
      <br />
      <br />
      <h1>🧑‍💻 Desenvolvendo aplicações Web e Mobile desde 2020</h1>
      <h1>
        🎓 Cursando Desenvolvimento de Sistemas pelo{" "}
        <a
          className="animated-link"
          href="https://cotuca.unicamp.br/"
          target="_blank"
        >
          COTUCA - Unicamp
        </a>
      </h1>
      <h1>🧐 Estou de olho no Deno e Bun</h1>
      <h1>🚀 Buscando oportunidade de estágio</h1>
    </main>
  </>
  )
}
