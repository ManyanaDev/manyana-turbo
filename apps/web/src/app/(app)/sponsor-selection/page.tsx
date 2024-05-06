import React from "react";
import SponsorSelection from "../../../components/forms/sponsor/SponsorSelection";
import { Header } from "@repo/ui/Header";

const page = () => {
  return (
    <div>
      <Header />
      <div className="max-w-screen-xl mx-auto space-y-5">
        <h1 className="text-3xl font-bold">Sponsor Selection</h1>
        <h2>Choose which projects you wish to sponsor and how much</h2>
        <SponsorSelection />
      </div>
    </div>
  );
};

export default page;
