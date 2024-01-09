import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
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
