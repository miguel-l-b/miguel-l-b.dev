
export function Button({ children, onClick }: { children: any, onClick: () => void }) {
  return (
    <button className={"shadow-[0px_0px_15px_#4945645c] bg-[#202020] rounded-3xl px-2 flex justify-center items-center"} onClick={onClick}>
      {children}
    </button>
  )
}