/* eslint-disable no-unused-vars */
"use client";

import { Elements } from "@stripe/react-stripe-js";
import { Stripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import _Stripe from "stripe";

import Payment from "./Payment";

const PaymentWrapper = ({
  stripe,
  clientSecret,
  getSubscription,
  subscriptionId,
}: {
  stripe: Stripe | PromiseLike<Stripe | null> | null;
  getSubscription(id: string): Promise<_Stripe.Response<_Stripe.Subscription>>;
  clientSecret: string;
  subscriptionId: string;
}) => {
  const [subscription, setSubscription] = useState<_Stripe.Subscription | null>(
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
    <Elements
      stripe={stripe}
      options={{
        clientSecret,
        appearance: {
          theme: "night",
        },
      }}
    >
      <Payment subscription={subscription} clientSecret={clientSecret} />
    </Elements>
  );
};

export default PaymentWrapper;
