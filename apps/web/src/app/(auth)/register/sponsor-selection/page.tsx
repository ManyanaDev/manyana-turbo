import React from "react";
import SponsorSelection from "../../../../components/forms/sponsor/SponsorSelection";
import { signOut } from "../../../../auth";
import { getProjects } from "../../../../actions/project/get-projects.action";

const page = async () => {
  const projects = await getProjects();

  if (!projects?.data) {
    return (
      <div className="max-w-screen-xl mx-auto space-y-5">
        <form
          action={async () => {
            "use server";
            await signOut({
              redirectTo: "/login",
            });
          }}
        >
          <button>Log Out</button>
        </form>
        Error loading projects
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto space-y-5">
      <form
        action={async () => {
          "use server";
          await signOut({
            redirectTo: "/login",
          });
        }}
      >
        <button>Log Out</button>
      </form>
      <h1 className="text-3xl font-bold">Sponsor Selection</h1>
      <h2>Choose which projects you wish to sponsor and how much</h2>
      <SponsorSelection projects={projects.data} />
    </div>
  );
};

export default page;
