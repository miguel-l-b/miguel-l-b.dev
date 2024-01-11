import { useParams } from 'next/navigation'
import { useEffect } from 'react'

export default function Redirection(context: any) {
  const data = useParams<{id: string}>()

  useEffect(() => {
    if(data && data.id)
        fetch(`/api/redirects/${data.id}`).then((res) => res.json()).then((res) => {
          console.log(res)
          window.location.assign(res.url)
        })
  }, [data])

  return(
    <main className="flex flex-col justify-center items-center h-dvh">
      <h1>Redirecionando ...</h1>
      <div className="animate-spin mt-20 w-10 h-10 border-blue border-l-4 rounded-full"/>
    </main>
  )
}
