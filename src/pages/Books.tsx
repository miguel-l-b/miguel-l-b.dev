import Header from "../components/Header"

export default function Books(): JSX.Element {
  return (
    <>
      <Header path="books" />
      <main className="text-center">
        <a
          href="https://www.amazon.com.br/C%C3%B3digo-Limpo-Robert-C-Martin-ebook/dp/B085Q2K632?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=3ROUZAO6K12P8&keywords=c%C3%B3digo+limpo&qid=1704582720&sprefix=c%C3%B3digo+limpo%2Caps%2C217&sr=8-2&linkCode=ll1&tag=miguellb-20&linkId=ab669a27e0b8db78d72b4122f8caa06d&language=pt_BR&ref_=as_li_ss_tl"
          target="_blank"
          className="flex flex-col gap-4 items-center w-fit m-auto"
        >
          <img
            className="rounded-3xl shadow-lg shadow-[#ffffff25]"
            src="/books/codigo_limpo.jpg"
            alt="foto da capa do livro"
          />
          <h1 className="text-2xl">
            <span className="animated-link">Código Limpo</span>
          </h1>
        </a>
      </main>
    </>
  )
}
