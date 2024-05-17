"use server";
import React from "react";
import { NextPage } from "next";
import { getProject } from "../../../../actions/project/get-project.action";
import { getProjects } from "../../../../actions/project/get-projects.action";
import { Project } from "@repo/shared/types";

const Page: NextPage<{
  params: Record<string, string>;
}> = async ({ params }) => {
  const project = await getProject(params?.slug);

  if (!project?.data) {
    return (
      <div className="max-w-screen-xl mx-auto space-y-5">
        <h1 className="text-3xl">Not found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto space-y-5">
      <h1 className="text-3xl">{project.data.project_name}</h1>
    </div>
  );
};

export async function generateStaticParams() {
  const projects = await getProjects();

  return (
    projects?.data?.map((project: Project) => ({
      slug: slugify(project.slug),
    })) ?? []
  );
}

export default Page;

function slugify(text: string) {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}
