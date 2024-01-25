import Link from "next/link"

export default function HeaderDash() {
  return (
    <header className="flex flex-col items-center gap-4 py-10 w-48 rounded-r-3xl bg-gray-dark h-screen shadow-lg shadow-black-dark">
      <Link href="/dashboard/techs">Tecnologias</Link>
      <Link href="/dashboard/timeline">Linha do Tempo</Link>
      <Link href="/dashboard/redirect">Redirecionamento</Link>
      <Link href="/dashboard/books">Livros</Link>
      <Link href="/dashboard/projects">Projetos</Link>
      <Link href="/dashboard/posts">Posts</Link>
      <Link href="/dashboard/users">Usuários</Link>
    </header>
  )
}
