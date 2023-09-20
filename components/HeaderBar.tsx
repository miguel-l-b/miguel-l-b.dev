import { useSignal } from "@preact/signals";
import { MdSearch } from "react-icons/md";

export function ButtonHeader({ children, onClick }: { children: any, onClick: () => void }) {
  return (
    <button className={"shadow-[0px_0px_15px_#4945645c] bg-[#202020] rounded-3xl w-12 flex justify-center items-center"} onClick={onClick}>
      {children}
    </button>
  )
}

export function HeaderBar() {
  const isOpenedSearch = useSignal(false);
  return (
    <header className={"flex justify-center py-8 px-12"}>
      <nav className={"bg-[#282929] w-[100%] h-12 rounded-3xl flex justify-between"}>
        <button className={"shadow-[0px_0px_15px_#4945645c] bg-[#202020] rounded-3xl w-12 flex justify-center items-center"} onClick={() => isOpenedSearch.value = !isOpenedSearch}>
            <MdSearch color="#E6EEEF" size={24} />
        </button>
      </nav>
    </header>
  )
}