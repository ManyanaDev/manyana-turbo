import React from "react";
import { Header } from "@repo/ui/Header";
import { NextPage } from "next";
import { projectList } from "@repo/shared/src";

import { SponsorAllocation } from "../../../components/forms/sponsor/SponsorAllocation";
import Link from "next/link";

const page: NextPage<{
  searchParams: Record<string, string>;
}> = ({ searchParams }) => {
  const projects = searchParams?.projects?.split(",");

  return (
    <div>
      <Header />
      <div className="max-w-screen-xl mx-auto space-y-5">
        {!projects?.length ? (
          <div className="text-center py-20 space-y-5">
            <h1 className="text-3xl font-bold">No projects selected</h1>
            <p>
              Please select projects you wish to sponsor from the list below
            </p>
            <div>
              <Link href="/sponsor-selection">
                <span className="text-blue-500">Go back to selection</span>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold">Sponsor Allocation</h1>
            <SponsorAllocation
              projects={projectList.filter((p) => projects?.includes(p.id))}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default page;
