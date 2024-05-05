import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Project from "@/components/Project";
import { ProjectType } from "@/infra/models/db/project";
import getBaseUrl from "@/infra/utils/url";
import { GetServerSidePropsResult } from "next";

export interface props {
  projects: ProjectType[];
}

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<props>
> {
  const res = await fetch(`${getBaseUrl()}/api/projects/all`);
  const errorCode = res.status >= 200 && res.status <= 399 ? false : res.status;

  if (errorCode != false)
    return {
      props: {
        projects: [],
      },
    };

  const projects = (await res.json()) as ProjectType[];

  return {
    props: {
      projects,
    },
  };
}

export default function Projects({ projects }: props): JSX.Element {
  if (!projects)
    return (
      <>
        <Header path="/projects" />
        <p>There was an error fetching the projects.</p>
        <Footer />
      </>
    );
  return (
    <>
      <Header path="/projects" />
      <div className="flex justify-center flex-wrap px-40">
        {projects.map((item, index) => (
          <Project key={index} {...item} />
        ))}
      </div>
      <Footer />
    </>
  );
}
