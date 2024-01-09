import Head from 'next/head'

import Book from "@/components/Book"
import Header from "@/components/Header"

export default function Books(): JSX.Element {
  return (
    <>
      <Head>
        <title>Miguel L B | Livros</title>
        <meta
          name="description"
          content="📚 Livros que me ajudaram a ser um desenvolvedor melhor"
        />
      </Head>
      <main>
        <Book
          img="/books/codigo_limpo.jpg"
          name="Código Limpo"
          why="é uma leitura essencial para programadores em busca de aprimoramento, pois destaca a importância da legibilidade, sustentabilidade e redução de complexidade no código. Ao seguir as práticas e princípios apresentados por Robert C. Martin, os desenvolvedores podem melhorar a colaboração, facilitar a manutenção do software a longo prazo e desenvolver habilidades cruciais para o desenvolvimento profissional em um ambiente ágil."
          buy={[
            {
              logo: "https://logopng.com.br/logos/amazon-2.png",
              url: "https://www.amazon.com.br/C%C3%B3digo-Limpo-Robert-C-Martin-ebook/dp/B085Q2K632?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=3ROUZAO6K12P8&keywords=c%C3%B3digo+limpo&qid=1704582720&sprefix=c%C3%B3digo+limpo%2Caps%2C217&sr=8-2&linkCode=ll1&tag=miguellb-20&linkId=ab669a27e0b8db78d72b4122f8caa06d&language=pt_BR&ref_=as_li_ss_tl",
              isElectronic: true,
            },
            {
              logo: "https://logopng.com.br/logos/amazon-2.png",
              url: "https://www.amazon.com.br/C%C3%B3digo-limpo-Robert-C-Martin/dp/8576082675?crid=2HXZ2TVKZQDWJ&keywords=c%C3%B3digo+limpo&qid=1704721955&sprefix=c%C3%B3digo+limpo%2Caps%2C196&sr=8-60&ufe=app_do%3Aamzn1.fos.6d798eae-cadf-45de-946a-f477d47705b9&linkCode=ll1&tag=miguellb-20&linkId=e3b4a4ecb76fcbfc1364477781033861&language=pt_BR&ref_=as_li_ss_tl",
              isElectronic: false,
            },
          ]}
        />
      </main>
    </>
  )
}
