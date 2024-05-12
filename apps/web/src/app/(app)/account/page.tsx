import React from "react";
import { NextPage } from "next";

const Page: NextPage<{
  searchParams: Record<string, string>;
}> = ({ searchParams }) => {
  return (
    <div className="max-w-screen-xl mx-auto space-y-5">
      <h1>Account</h1>
    </div>
  );
};

export default Page;
