interface BookProps {
  img: string
  name: string
  why: string
  buy: Array<{
    logo: string
    url: string
    isElectronic: boolean
  }>
}

export default function Book(props: BookProps): JSX.Element {
  const [physical, electronic] = [
    props.buy.filter((e) => !e.isElectronic),
    props.buy.filter((e) => e.isElectronic),
  ]
  return (
    <div className="m-auto w-[60vw] flex">
      <img
        className="w-[20rem] h-[13.5rem] rounded-xl"
        src={props.img}
        alt={`capa do livro ${props.name}`}
      />
      <div className="ml-10">
        <h2 className="text-xl text-white">{props.name}</h2>
        <h3 className="text-lg text-gray font-bold font-jura">Por que Ler?</h3>
        <p className="text-md text-gray font-jura">{props.why}</p>
        <div className="flex gap-5">
          <h3 className="text-lg">Links de onde Comprar:</h3>
          {physical.map((item, index) => (
            <a href={item.url} target="_blank" rel="noreferrer" key={index}>
              <img src={item.logo} className="w-6" alt="logo da empresa ..." />
            </a>
          ))}
          {electronic.length > 0 && <span>eBook:</span>}
          {electronic.map((item, index) => (
            <a href={item.url} target="_blank" rel="noreferrer" key={index}>
              <img src={item.logo} className="w-6" alt="logo da empresa ..." />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
