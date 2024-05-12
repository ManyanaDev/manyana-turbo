import React from "react";
import { NextPage } from "next";
import { getProject } from "../../../../actions/project/get-project.action";

const Page: NextPage<{
  params: Record<string, string>;
}> = async ({ params }) => {
  const project = await getProject(params?.id);

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

export default Page;
