import HeaderDash from "@/components/HeaderDash"
import Head from "next/head"

export default function Projects() {
  return (
  <main className="flex">
    <Head>
      <title>Dashboard | Projetos</title>
    </Head>
    <HeaderDash />
    <form id="create">
      <input type="text" placeholder="Slug" />
      <input type="text" placeholder="Name" />
      <input type="text" placeholder="Description" />
      <input type="text" placeholder="Image" />
      <input type="text" placeholder="Tags" />
      <input type="text" placeholder="License" />
      <input type="text" placeholder="Techs" />
      <input type="text" placeholder="Github" />
      <input type="text" placeholder="DemoURL" />
    </form>
  </main>
  )
}
