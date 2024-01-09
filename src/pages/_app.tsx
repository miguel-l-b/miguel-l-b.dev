import type { AppProps } from 'next/app'
import { usePathname } from 'next/navigation'

import Curse from '@/components/Curse'
import '@/styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta
          name="description"
          content="Miguel L B - Desenvolvedor Web Full Stack"
        />
      </Head>
      <Curse />
      <Component {...pageProps} />
    </>
  )
}
