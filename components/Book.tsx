import Image from 'next/image'
import * as MaterialIcons from "react-icons/md"

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
    <div className="m-auto w-[60dvw] flex flex-col items-center gap-10 xl:gap-0 xl:flex-row">
      <Image
        className="w-[15rem] xl:w-auto xl:h-[20rem] rounded-xl"
        width={320}
        height={216}
        src={props.img}
        alt={`capa do livro ${props.name}`}
      />
      <div className="ml-10">
        <h2 className="text-xl text-white">{props.name}</h2>
        <h3 className="flex items-center gap-3 text-lg text-gray font-bold font-jura">Por que Ler? <MaterialIcons.MdExpandCircleDown className={`sm:hidden`} /></h3>
        <p className={`text-md text-gray font-jura hidden sm:block`}>{props.why}</p>
        <div className="flex gap-4">
          <h3 className="text-lg">Links de onde Comprar:</h3>
            {physical.map((item, index) => (
              <a href={item.url} target="_blank" rel="noreferrer" key={index}>
                <Image src={item.logo} className="w-6" width={24} height={24} alt="logo da empresa ..." />
              </a>
            ))}
          {electronic.length > 0 && <span>eBook:</span>}
            {electronic.map((item, index) => (
              <a href={item.url} target="_blank" rel="noreferrer" key={index}>
                <Image src={item.logo} className="w-6" width={24} height={24} alt="logo da empresa ..." />
              </a>
            ))}
        </div>
      </div>
    </div>
  )
}
