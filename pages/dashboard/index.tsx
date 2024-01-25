import Footer from "@/components/Footer"
import HeaderDash from "@/components/HeaderDash"
import validToken from "@/infra/utils/valid_token"
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import Head from "next/head"

export async function getServerSideProps({ req, res }: GetServerSidePropsContext): Promise<GetServerSidePropsResult<any>> {
  if(!validToken(req, res))
    return {
      redirect: {
        destination: "/dashboard/login",
        permanent: false
      }
    }
  return {
    props: {}
  }
}


export default function Dashboard() {
  return (
    <>
    <Head>
      <title>Dashboard</title>
    </Head>
    <HeaderDash />
    </>
  )
}
