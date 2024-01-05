import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"

export default function ErrorNotFound(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>404 | {window.location.pathname}</title>
      </Helmet>
      <main className="flex flex-col h-dvh gap-28 text-center justify-center items-center">
        <h1 className="text-5xl font-bold font-jura">404</h1>
        <h1 className="text-2xl">
          Página não encontrada {window.location.pathname}, volte para a{" "}
          <Link to="/" className="animated-link">
            página inicial
          </Link>
        </h1>
      </main>
    </>
  )
}
