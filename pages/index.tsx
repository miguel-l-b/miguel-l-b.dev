import Image from 'next/image'
import Head from 'next/head'
import Header from '@/components/Header'
import TimeLine from '@/components/timeline'
import Roller from '@/components/Roller'

const texts = [
  {text: "Miguel Lopes B.", style: "bg-green text-xl"},
  {text: "Desenvolvedor de Software", style: "bg-blue text-xl"},
  {text: "Desenvolvedor FullStack", style: "bg-yellow text-xl"},
]

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
      <h1>Olá 🖖, eu sou <Roller values={texts} /></h1>
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
    <main className="mt-40 py-20 bg-black-dark w-full h-full">
      <h1 className="text-center text-2xl font-orbitron font-extrabold text-gray-light mb-10">
        Linha do Tempo
      </h1>
      <TimeLine.root />
    </main>
  </>
  )
}
