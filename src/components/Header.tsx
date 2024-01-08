import { Link } from "react-router-dom"

export interface HeaderProps {
  path?: "home" | "books" | "posts" | "projects"
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
      className={`flex group items-center h-full pl-10 pr-10 rounded-xl bg-none hover:bg-gradient-to-b hover:from-[#fff]
      hover:to-[#ffffff00] hover:from-50% hover:bg-clip-text hover:text-transparent ${
        props.clicked && "bg-gradient-to-tr to-[#35423E] from-[#3D3A47]"
      }`}
      to={props.path}
    >
      <h2
        className={`text-white font-jura text-2xl font-medium ${
          props.clicked &&
          "bg-gradient-to-b from-[#fff] to-[#ffffff00] from-50% bg-clip-text text-transparent"
        }`}
      >
        {props.children}
      </h2>
    </Link>
  )
}

export default function Header(props: HeaderProps): JSX.Element {
  console.log(props.path)
  return (
    <nav className="flex p-10 items-center justify-center">
      {props.path !== "home" ? (
        <Link to="/">
          <img
            className="w-24 h-24 fixed left-[5vw] top-[1.5rem]"
            src="/logo-polygon.svg"
            alt="logo tipo"
          />
        </Link>
      ) : (
        <div className="w-24 h-24 fixed left-[10rem] top-[1.5rem]"></div>
      )}
      <ul className="flex gap-20 justify-center bg-black-light w-[60vw] h-14 rounded-full shadow-sm shadow-black-dark">
        <HeaderLink path="/books" clicked={props.path === "books"}>
          Livros
        </HeaderLink>
        {/* <HeaderLink path="/projects" clicked={props.path === "projects"}>
          Projetos
        </HeaderLink> */}
      </ul>
    </nav>
  )
}
