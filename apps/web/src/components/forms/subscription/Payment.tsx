"use client";

import React, { FormEvent, useEffect, useState } from "react";
import {
  useElements,
  useStripe,
  PaymentElement,
} from "@stripe/react-stripe-js";
import Stripe from "stripe";
import { Button } from "@repo/ui/button";
import { PaymentIntent } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";

const Payment = ({
  subscription,
  clientSecret,
}: {
  subscription: Stripe.Subscription;
  clientSecret: string;
}) => {
  const { push } = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent | null>(
    null
  );

  const [loading, setLoading] = useState(false);

  const INCOMPLETE = subscription?.status === "incomplete";

  useEffect(() => {
    if (!stripe) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }

      paymentIntent && setPaymentIntent(paymentIntent);
    });
  }, [stripe]);

  if (!stripe || !elements) {
    // Stripe.js has not loaded yet. Make sure to disable
    // form submission until Stripe.js has loaded.
    return null;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    setMessage("");
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    await elements.submit();

    let { error } = await stripe.confirmPayment({
      clientSecret,
      elements,
      confirmParams: {
        return_url: window.location.href,
      },
    });

    if (
      (error && error.type === "card_error") ||
      error.type === "validation_error"
    ) {
      // @ts-ignore
      setMessage(error.message || error.code);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setLoading(false);
  }

  if (paymentIntent && paymentIntent.status === "succeeded") {
    push("/account");
  }

  return (
    <div className="">
      <h1 className="text-3xl font-bold ">Payment</h1>
      {INCOMPLETE && (
        <div>
          <p>Payment is incomplete</p>
          <form onSubmit={handleSubmit}>
            <PaymentElement
              id="payment-element"
              options={{
                layout: "tabs",
              }}
            />
            <div className="my-2">
              <Button
                buttonType="submit"
                type="primary"
                disabled={loading || !stripe || !elements}
              >
                Submit Payment
              </Button>
            </div>
            {message && (
              <div className="p-4 bg-red-200 text-red-800">{message}</div>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default Payment;
