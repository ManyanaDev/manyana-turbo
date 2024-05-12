import React from "react";
import { NextPage } from "next";
import { getMerchantProjects } from "../../../actions/merchant/merchant-projects";
import Link from "next/link";

const Page: NextPage<{
  searchParams: Record<string, string>;
}> = async () => {
  const merchantProjects = await getMerchantProjects();

  const list = merchantProjects?.data?.map((project) => (
    <div key={project.id}>
      <Link href={`/projects/${project.id}`}>
        <div>{project.project_name}</div>
      </Link>
    </div>
  ));

  return (
    <div className="max-w-screen-xl mx-auto space-y-5">
      <h1 className="text-3xl">Projects</h1>
      {merchantProjects?.data?.length === 0 ? (
        <div>No projects found</div>
      ) : (
        <div>{list}</div>
      )}
    </div>
  );
};

export default Page;
