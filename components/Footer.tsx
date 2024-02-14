import Link from 'next/link'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer
      className={`
        mt-10 w-full py-20 px-10 bg-black-dark
        flex flex-col gap-5 items-center justify-center
        rounded-t-3xl shadow-xl drop-shadow-xl shadow-white
      `}
    >
      <div className="flex gap-5 text-2xl">
        <Link
          className="link"
          href="https://github.com/miguel-l-b"
          target="_blank"
        >
          <FiGithub />
        </Link>
        <Link
          className="link"
          href="https://www.linkedin.com/in/miguel-lb/"
          target="_blank"
        >
          <FiLinkedin />
        </Link>
        <Link
          className="link"
          href="mailto:miguellopesbraido@gmail.com"
          target="_blank"
        >
          <FiMail />
        </Link>
      </div>
      <h1 className="text-gray-light text-xl">
        Feito por Miguel Lopes Braido © 2023-{new Date().getFullYear()}
      </h1>
    </footer>
  )
}
