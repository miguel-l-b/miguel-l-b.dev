import Head from "next/head"
import Link from "next/link"

export default function InternalServerError(): JSX.Element {
  return (
    <>
      <Head>
        <title>Miguel L B | 500</title>
      </Head>
      <main className="flex flex-col h-dvh gap-28 text-center justify-center items-center">
        <h1 className="text-5xl font-bold font-jura">500</h1>
        <h1 className="text-2xl">
          Erro interno do servidor, volte para a{" "}
          <Link href="/" className="animated-link">
            página inicial
          </Link>
        </h1>
      </main>
    </>
  )
}
