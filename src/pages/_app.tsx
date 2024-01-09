"use client"
import type { AppProps } from 'next/app'
import { usePathname } from 'next/navigation'

import Curse from '@/components/Curse'
import Header from '@/components/Header'
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  const current = usePathname()
  return (
    <>
      <Header path={current} />
      <Curse />
      <Component {...pageProps} />
    </>
  )
}
