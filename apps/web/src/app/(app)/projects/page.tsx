import React from "react";
import { NextPage } from "next";
import { getMerchantProjects } from "../../../actions/merchant/merchant-projects";
import { Project } from "@repo/shared/types";
import ProjectCard from "../../../components/elements/ProjectCard";

const Page: NextPage<{
  searchParams: Record<string, string>;
}> = async () => {
  const merchantProjects = await getMerchantProjects();

  const list = merchantProjects?.data?.map((project: Project) => (
    <ProjectCard {...project} />
  ));

  return (
    <div className="max-w-screen-xl mx-auto space-y-5">
      <h1 className="text-3xl">Projects</h1>
      {merchantProjects?.data?.length === 0 ? (
        <div>No projects found</div>
      ) : (
        <div className="grid grid-cols-3 gap-5">{list}</div>
      )}
    </div>
  );
};

export default Page;
