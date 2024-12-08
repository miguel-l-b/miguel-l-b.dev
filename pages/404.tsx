import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ErrorNotFound(): JSX.Element {
  const [path, setPath] = useState("/");

  useEffect(() => {
    setPath(window.location.pathname);
  }, []);

  return (
    <>
      <Head>
        <title>Miguel L B | 404</title>
      </Head>
      <main className="flex flex-col h-dvh gap-28 text-center justify-center items-center">
        <h1 className="text-5xl font-bold font-jura">404</h1>
        <h1 className="text-2xl">
          Página não encontrada {path}, volte para a{" "}
          <Link
            href="/"
            className="animated-link"
            aria-label="Ir para a página inicial"
          >
            página inicial
          </Link>
        </h1>
      </main>
    </>
  );
}
