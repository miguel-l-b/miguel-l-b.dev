import Head from "next/head";
import Image from "next/image";
import { GetServerSidePropsResult } from "next";
import { useRouter } from "next/router";
import { FiChevronsRight } from "react-icons/fi";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { TechType } from "@/infra/models/db/tech";
import getBaseUrl from "@/infra/utils/url";
import Link from "next/link";
import ListViewController from "@/components/list-view";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export interface props {
  techs: TechType[];
}

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<props>
> {
  const res = await fetch(`${getBaseUrl()}/api/techs/all`);
  const errorCode = res.status >= 200 && res.status <= 399 ? false : res.status;

  if (errorCode != false)
    return {
      props: {
        techs: [],
      },
    };

  const techs = (await res.json()) as TechType[];
  return {
    props: {
      techs,
    },
  };
}

export default function Projects({ techs }: props): JSX.Element {
  const router = useRouter();

  const params = useSearchParams();
  const [techsFiltered, setTechsFiltered] = useState<TechType[]>(techs);

  useEffect(() => {
    const input = params.get("search") || "";
    const name = techs.filter((item) =>
      item.name.toLowerCase().includes(input.toLowerCase())
    );
    const description = techs.filter((item) =>
      item.description.toLowerCase().includes(input.toLowerCase())
    );
    const category = techs.filter((item) =>
      item.category?.toLowerCase().includes(input.toLowerCase())
    );
    const tags = techs.filter((item) =>
      item.tags.some((tag) => tag.toLowerCase().includes(input.toLowerCase()))
    );

    const filtered = Array.from(
      new Set([...name, ...description, ...category, ...tags])
    );
    setTechsFiltered(filtered);
  }, [params, techs]);

  return (
    <>
      <Head>
        <title>Miguel L B | Tecnologias</title>
      </Head>
      <Header path="/techs" />
      <main className="w-80 lg:w-1/3 mx-auto">
        <h1 className="text-center mt-20">Tecnologias</h1>
        <br />
        <form
          onSubmit={(e) => {
            e.preventDefault();

            const { firstChild, firstElementChild, ...elements } =
              e.currentTarget;

            const inputs: { key: string; value: any }[] = [];
            for (const key in e.currentTarget) {
              if (key === "firstChild") continue;
              const element = e.currentTarget[key];
              if (
                element instanceof HTMLInputElement ||
                element instanceof HTMLTextAreaElement ||
                element instanceof HTMLSelectElement
              )
                inputs.push({ key, value: element.value });
            }

            router.push(
              window.location.pathname +
                "?" +
                inputs.map((input) => `${input.key}=${input.value}`).join("&")
            );
          }}
          className="flex gap-5"
        >
          <input
            className="bg-white text-black-dark border-none shadow-xl"
            type="search"
            name={"search"}
            defaultValue={params.get("search") || ""}
          />
          <button type="submit" className="bg-blue px-4 rounded-xl font-bold">
            buscar
          </button>
        </form>
      </main>
      <ListViewController
        className="flex flex-col justify-center gap-20 w-fit p-14 mx-auto"
        limitPerPage={10}
        content={techsFiltered.map((item, index) => (
          <div
            onClick={() => router.push(`/techs/${item.name}`)}
            key={index}
            className="flex flex-wrap gap-10 bg-black-light p-10 rounded-3xl items-center"
          >
            <Image
              className="bg-gray-dark bg-opacity-50 shadow-xl rounded-2xl p-2"
              width={60}
              height={60}
              src={item.img}
              alt={item.name}
            />
            <h1>{item.name}</h1>
            <div className="flex flex-col gap-10 sm:flex-row basis-full">
              <h2>
                {item.description.length > 100
                  ? item.description.substring(0, 100) + "..."
                  : item.description}
              </h2>
              <Link
                href={`/techs/${item.name}`}
                className="group p-2 rounded-2xl bg-gray-dark ml-auto"
              >
                <FiChevronsRight className="w-10 h-10 animate-custom_two group-hover:animate-none" />
              </Link>
            </div>
          </div>
        ))}
      ></ListViewController>
      <Footer />
    </>
  );
}
