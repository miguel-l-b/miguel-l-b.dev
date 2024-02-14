'use client'
import getBaseUrl from "@/infra/utils/url"
import { useRouter } from "next/router"
import { FiShare2 } from "react-icons/fi"

type componentProps = {
  urlAlternative?: string
  urlAdditional?: string,
  message?: string,
  className?: string,
}

export default function Share({ urlAlternative, urlAdditional, message, className }: componentProps) {
  const router = useRouter()
  const url = urlAlternative || `${getBaseUrl()}${router.asPath}${urlAdditional || ""}`
  const text = message || "Confira esse conteúdo de Miguel L. B.!"

  function share() {
    if(navigator.share) {
      navigator.share({
        title: document.title,
        text: text,
        url: url,
      })
    } else {
      navigator.clipboard.writeText(`${text}\n${url}`)
    }
  }
  return (
    <button onClick={share} className={`flex items-center group ${className}`}>
      <FiShare2 className={`ml-5 bg-blue text-white p-2 rounded-xl`} size={50} />
      <p
        className={`
          px-5 py-0.5 rounded-r-xl
          font-bold text-black bg-blue-light
          w-0 -ml-5 -z-10
          opacity-0 transition-all duration-300
          group-hover:ml-0 group-hover:w-auto group-hover:opacity-100
        `}
      >
        Compartilhar
      </p>
    </button>
  )
}
