import React from "react";
import { Header } from "@repo/ui/Header";
import { NextPage } from "next";

const Page: NextPage<{
  searchParams: Record<string, string>;
}> = ({ searchParams }) => {
  return <div className="max-w-screen-xl mx-auto space-y-5"></div>;
};

export default Page;
