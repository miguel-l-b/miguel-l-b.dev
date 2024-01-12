import Link from "next/link"
import Image from "next/image"

import * as MaterialIcons from "react-icons/md"
import { useState } from "react"

export interface HeaderProps {
  path?: string
}

interface HeaderLinkProps {
  className?: string
  path: string
  clicked: boolean
  children: React.ReactNode
}

export function HeaderLink(props: HeaderLinkProps): JSX.Element {
  return (
    <Link
      className={`flex group items-center h-full pl-10 pr-10 rounded-xl ${
        props.clicked?
        "bg-gradient-to-tr to-[#35423E] from-[#3D3A47]" :
        "duration-200 delay-75 transition-all hover:bg-gradient-to-tr hover:to-[#35423E] hover:from-[#3D3A47]"
      }`}
      href={props.path}
    >
      <li
        className={`text-white font-orbitron text-xl font-medium ${
          props.clicked ?
          "bg-gradient-to-b from-[#fff] to-[#ffffff00] from-50% bg-clip-text text-transparent" : ""
        }`}
      >
        {props.children}
      </li>
    </Link>
  )
}

export default function Header(props: HeaderProps): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  return (
    <>
    <nav className="p-10 items-center justify-center hidden md:flex">
      {props.path !== "/" ? (
        <Link href="/">
          <Image
            className="w-24 h-24 fixed left-[5vw] top-[1.5rem]"
            src="/img/logo-polygon.svg"
            width={96}
            height={96}
            alt="logo tipo"
          />
        </Link>
      ) : (
        <div className="w-24 h-24 fixed left-[10rem] top-[1.5rem]"></div>
      )}
      <ul className="flex gap-20 justify-center bg-black-light w-[60dvw] h-14 rounded-full shadow-sm shadow-black-dark">
        <HeaderLink path="/books" clicked={props.path === "/books"}>
          Livros
        </HeaderLink>
        {/* <HeaderLink path="/projects" clicked={props.path === "projects"}>
          Projetos
        </HeaderLink> */}
      </ul>
    </nav>
    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="fixed top-0 p-2 m-4 bg-gradient-to-tr from-gray-dark from-[20%] to-[160%] rounded-xl to-gray-light z-40 md:hidden">
      <MaterialIcons.MdNotes className="size-8" />
    </button>
    <div onClick={() => setIsMenuOpen(false)} className={`${isMenuOpen? 'fixed' : 'hidden'} w-dvw h-dvh bg-black-dark z-40 opacity-65`} />
    <nav className={`${isMenuOpen? 'fixed' : 'hidden'} p-5 h-dvh bg-black rounded-r-[4rem] z-50`}>
    {props.path !== "/" && (
        <Link href="/">
          <Image
            className="w-24 h-24 fixed left-[5vw] top-[1.5rem]"
            src="/img/logo-polygon.svg"
            width={96}
            height={96}
            alt="logo tipo"
          />
        </Link>
      )}
      <HeaderLink path="/books" clicked={props.path === "/books"}>
        Livros
      </HeaderLink>
      {/* <HeaderLink path="/projects" clicked={props.path === "projects"}>
        Projetos
      </HeaderLink> */}
    </nav>
    <div className="w-full h-20 md:hidden" />
    </>
  )
}
