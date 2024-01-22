import type { AppProps } from 'next/app'
import { usePathname } from 'next/navigation'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

import Head from 'next/head'

import Curse from '@/components/Curse'
import '@/styles/globals.css'
import Footer from '@/components/Footer'
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/img/logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta
          name="description"
          content="Miguel L B - Desenvolvedor Web Full Stack"
        />
      </Head>
      <div className="min-h-screen flex flex-col justify-between">
        <Curse />
        <Component {...pageProps} />
      </div>
      <SpeedInsights />
      <Analytics />
    </>
  )
}
