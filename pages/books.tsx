import Head from 'next/head'

import Book from "@/components/Book"
import Header from "@/components/Header"
import Footer from '@/components/Footer'
import { GetServerSidePropsResult } from 'next'
import { BookType } from '@/infra/models/db/book'
import getBaseUrl from '@/infra/utils/url'

type props = {
  books: Array<BookType>,
}

export async function getServerSideProps(): Promise<GetServerSidePropsResult<props>> {
  const res = await fetch(`${getBaseUrl()}/api/books/all`)
  const errorCode = res.status >= 200 && res.status <= 399 ? false : res.status

  if(errorCode != false)
    return { props: { books: [] } }

  const books = await res.json()

  return {
    props: { books },
  }
}

export default function Books({ books }: props): JSX.Element {
  return (
    <>
      <Head>
        <title>Miguel L B | Livros</title>
        <meta
          name="description"
          content="📚 Livros que me ajudaram a ser um desenvolvedor melhor"
        />
      </Head>
      <Header path="/books" />
      <main className="flex flex-col gap-20">
        {
          books?.map((props, index) => (
            <Book key={index} {...props} />
          ))
        }
      </main>
      <Footer />
    </>
  )
}
