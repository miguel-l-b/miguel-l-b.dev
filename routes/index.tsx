import { useSignal } from "@preact/signals";
import { HeaderBar } from "@components";

export default function Home() {
  const count = useSignal(3);
  return (
    <>
      <main>
        <HeaderBar />
      </main>
    </>
  );
}
