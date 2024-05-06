"use client";
/* eslint-disable turbo/no-undeclared-env-vars */
import React, { useEffect, useState } from "react";
import { NextPage } from "next";

import { getSubscription } from "../../../../actions/stripe/subscriptions.action";
import PaymentWrapper from "../../../../components/forms/subscription/PaymentWrapper";
import getStripe from "../../../../actions/stripe/load-stripe.action";
import Stripe from "stripe";

const page: NextPage<{
  searchParams: Record<string, string>;
}> = ({ searchParams }) => {
  const stripePromise = getStripe();

  const subscriptionId = searchParams?.sub_id ?? "";
  const clientSecret = searchParams?.cs ?? "";

  const [subscription, setSubscription] = useState<Stripe.Subscription | null>(
    null
  );

  useEffect(() => {
    if (subscriptionId) {
      getSubscription(subscriptionId).then((data) => {
        setSubscription(data);
      });
    }
  }, []);

  if (!subscription) {
    return <div className="text-center py-20">No checkout session found</div>;
  }

  return (
    <PaymentWrapper
      stripe={stripePromise}
      subscription={subscription}
      clientSecret={clientSecret}
    />
  );
};

export default page;
