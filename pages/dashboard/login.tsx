import Footer from "@/components/Footer"
import validToken from "@/infra/utils/valid_token"
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import Head from "next/head"
import { useState } from "react"

export async function getServerSideProps({req, res}: GetServerSidePropsContext): Promise<GetServerSidePropsResult<any>> {
  if(validToken(req, res))
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false
      }
    }
  return {
    props: {}
  }
}

export default function Login() {
  const [pass, setPass] = useState("")

  function login(password: string) {
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ password })
    })
      .then(async (res) => {
        const data = res.json()
        if(!res.ok) {
          alert("Senha incorreta")
        }
        else
          window.location.href = "/dashboard"
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
    <Head>
      <title>Dashboard | Login</title>
      <meta name="description" content="Login" />
    </Head>
    <form className="flex flex-col w-96 m-auto" onSubmit={(e) => {
      e.preventDefault()
      login(pass)
    }}>
      <label htmlFor="password">Password</label>
      <input type="password" id="password" name="pass" onChange={(e) => setPass(e.target.value)} />
      <button type="submit">Login</button>
    </form>
    </>
  )
}
