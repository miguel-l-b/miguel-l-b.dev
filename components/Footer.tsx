
export default function Footer() {
  return (
    <footer className="mt-10 w-full py-20 px-10 bg-black-dark flex items-center justify-center rounded-t-3xl shadow-xl drop-shadow-xl shadow-white">
      <h1 className="text-gray-light text-xl">Feito por Miguel Lopes Braido © 2023-{new Date().getFullYear()}</h1>
    </footer>
  )
}
