// import Header from "../components/Header"

export default function Home(): JSX.Element {
  return (
    <>
      {/* <Header path="home" /> */}
      <main className="text-center mt-20">
        <img
          className="w-52 h-52 m-auto"
          src="logo-ellipse.svg"
          alt="logo tipo"
        />
        <h1 className="text-4xl mt-10">Miguel Lopes Braido</h1>
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
        <h1>🧐 Sempre</h1>
        <h1>🚀 Buscando oportunidade de estágio</h1>
      </main>
    </>
  )
}
