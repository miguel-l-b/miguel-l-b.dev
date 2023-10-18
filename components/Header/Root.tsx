export interface RootProps {
  children: any
}

export function Root({ children }: RootProps) {
  return(
    <header className={"flex justify-center py-8 px-12"}>
      <nav className={"bg-[#282929] w-[100%] h-12 rounded-3xl flex justify-between"}>
        {children}
      </nav>
    </header>
  )
}