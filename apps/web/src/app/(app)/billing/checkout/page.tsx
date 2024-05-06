import React from "react";
import { Header } from "@repo/ui/Header";
import { NextPage } from "next";
import SelectSubscription from "../../../../components/forms/subscription/SelectSubscription";
import { getPricesAsOptions } from "../../../../actions/stripe/prices.action";

const page: NextPage<{
  searchParams: Record<string, string>;
}> = async ({ searchParams }) => {
  const sponsorAllocation = searchParams?.sponsorAllocation;

  const prices = await getPricesAsOptions();

  let allocations: Record<string, number> = {};

  if (!sponsorAllocation) {
    return (
      <div>
        <Header />
        <div className="text-center py-20">No sponsor allocation found</div>
      </div>
    );
  }

  try {
    allocations = sponsorAllocation && JSON.parse(sponsorAllocation);
  } catch (error) {
    return (
      <div>
        <Header />
        <div className="text-center py-20">Invalid JSON</div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <SelectSubscription options={prices} allocations={allocations} />
    </div>
  );
};

export default page;
