import { useSignal } from "@preact/signals";
import { Header } from "@components";

export default function Home() {
  const count = useSignal(3);
  return (
    <>
      <main>
        <h1 className="text-2xl text-center color-white">Em Construção, volte daqui alguns dias...</h1>
      </main>
    </>
  );
}
