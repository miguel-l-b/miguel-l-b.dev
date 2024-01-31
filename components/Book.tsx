import { BookType } from '@/infra/models/db/book'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import * as MaterialIcons from "react-icons/md"

export default function Book(props: BookType): JSX.Element {
  const params = useSearchParams()
  const [isOpenedMore, setIsOpenedMore] = useState<boolean>(false)
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
        <h3
          onClick={() => setIsOpenedMore(!isOpenedMore)}
          className="flex items-center gap-3 text-lg text-gray font-bold font-jura"
        >
          Por que Ler?
          <MaterialIcons.MdExpandCircleDown  className={`sm:hidden transition-all duration-500 ${isOpenedMore ? "rotate-180 " : "rotate-0"}`} />
        </h3>
        <p className={`text-md text-gray font-jura sm:opacity-100 sm:h-auto transition-all duration-200 ease-in ${!isOpenedMore && "h-0 opacity-0"} `}>{props.why}</p>
        <br />
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
