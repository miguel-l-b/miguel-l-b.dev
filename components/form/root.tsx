import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export interface FormRootProps extends React.HTMLProps<HTMLFormElement> {
  saveInUrl?: boolean;
  onSubmit?: (inputs: { [key: string]: any }) => void;
  children: React.ReactNode;
}

export default function FormRoot({
  saveInUrl,
  onSubmit,
  children,
  ...props
}: FormRootProps) {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    if (saveInUrl) {
      params.forEach((value, key) => {
        const element = document.getElementsByName(key)[0] as
          | HTMLInputElement
          | HTMLSelectElement
          | HTMLTextAreaElement;
        if (element) element.value = value;
      });
    }
  }, [params, saveInUrl]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const elements = Array.from(
          e.currentTarget.querySelectorAll("input, select, textarea")
        );
        let data: { [key: string]: any } = {};
        for (const element of elements) {
          const { name, value } = element as
            | HTMLInputElement
            | HTMLSelectElement
            | HTMLTextAreaElement;
          data[name] = value;
        }
        if (saveInUrl) {
          const searchParams = new URLSearchParams();
          for (const key in data) {
            searchParams.set(key, data[key]);
          }
          console.log(searchParams.toString());
          router.push({ search: searchParams.toString() });
        }
      }}
      {...props}
    >
      {children}
    </form>
  );
}
