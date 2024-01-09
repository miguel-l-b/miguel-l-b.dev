'use client'
import Head from "next/head"
import Link from "next/link"
import { usePathname } from 'next/navigation'

export default function ErrorNotFound(): JSX.Element {
  const current = usePathname()
  return (
    <>
      <Head>
        <title>Miguel L B | 404</title>
      </Head>
      <main className="flex flex-col gap-28 text-center justify-center items-center">
        <h1 className="text-5xl font-bold font-jura">404</h1>
        <h1 className="text-2xl">
          Página não encontrada {current}, volte para a{" "}
          <Link href="/" className="animated-link">
            página inicial
          </Link>
        </h1>
      </main>
    </>
  )
}
