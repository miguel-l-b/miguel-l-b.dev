import { useSearchParams } from "next/navigation"

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  id: string
  children: React.ReactNode
}

export default function Content({ id, children, ...props }: Props) {
  const params = useSearchParams()

  if(params.get("tab") !== id) return <></>
  return (
  <div id={"tab_content_"+id} className="px-2" {...props}>
    {children}
  </div>
  )
}
