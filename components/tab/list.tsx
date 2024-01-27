export interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export default function List({ children, className = "", ...props }: ListProps) {
  return (
    <div id="tabList" className={`flex justify-center gap-10 mb-6 ${className}`} {...props}>
      {children}
    </div>
  )
}
