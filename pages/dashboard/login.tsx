import Head from "next/head"
import { useState } from "react"

function login(pass: string) {
  fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ pass })
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        window.location.href = "/dashboard"
      } else {
        alert("Incorrect password")
      }
    })
    .catch((err) => alert("Incorrect password"))
    .catch((err) => alert("Incorrect password"))
}

export default function Login() {
  const [pass, setPass] = useState("")

  return (
    <>
    <Head>
      <title>Dashboard | Login</title>
      <meta name="description" content="Login" />
    </Head>
    <form onChange={(e) => e.defaultPrevented}>
      <label htmlFor="password">Password</label>
      <input type="password" id="password" name="pass" onChange={(e) => setPass(e.target.value)} />
      <button type="submit" onChange={() => login(pass)}>Login</button>
    </form>
    </>
  )
}
