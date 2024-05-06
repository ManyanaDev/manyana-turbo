"use client";

import { Elements } from "@stripe/react-stripe-js";
import { Stripe } from "@stripe/stripe-js";
import React from "react";
import _Stripe from "stripe";

import Payment from "./Payment";

const PaymentWrapper = ({
  subscription,
  stripe,
  clientSecret,
}: {
  subscription: _Stripe.Subscription;
  stripe: Stripe | PromiseLike<Stripe | null> | null;
  clientSecret: string;
}) => {
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
