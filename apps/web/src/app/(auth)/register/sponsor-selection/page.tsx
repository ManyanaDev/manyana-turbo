import React from "react";
import SponsorSelection from "../../../../components/forms/sponsor/SponsorSelection";
import { signOut } from "../../../../auth";

const page = async () => {
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
      <SponsorSelection />
    </div>
  );
};

export default page;
