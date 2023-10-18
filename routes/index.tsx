import { useSignal } from "@preact/signals";
import { Header } from "@components";

export default function Home() {
  const count = useSignal(3);
  return (
    <>
      <main>
        <Header.root>
          <Header.button>oiijascbvjbvj</Header.button>
        </Header.root>
      </main>
    </>
  );
}
