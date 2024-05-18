"use server";
/* eslint-disable turbo/no-undeclared-env-vars */
import React, { useEffect, useState } from "react";
import { NextPage } from "next";

import { getSubscription } from "../../../../actions/stripe/subscriptions.action";
import PaymentWrapper from "../../../../components/forms/subscription/PaymentWrapper";
import getStripe from "../../../../actions/stripe/load-stripe.action";

const page: NextPage<{
  searchParams: Record<string, string>;
}> = ({ searchParams }) => {
  const stripePromise = getStripe();

  const subscriptionId = searchParams?.sub_id ?? "";
  const clientSecret = searchParams?.cs ?? "";

  return (
    <PaymentWrapper
      stripe={stripePromise}
      clientSecret={clientSecret}
      getSubscription={getSubscription}
      subscriptionId={subscriptionId}
    />
  );
};

export default page;
