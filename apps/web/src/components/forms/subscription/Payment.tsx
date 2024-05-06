"use client";

import React, { FormEvent, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
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
  const [messages, _setMessages] = useState("");
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent | null>(
    null
  );

  if (!stripe || !elements) {
    // Stripe.js has not loaded yet. Make sure to disable
    // form submission until Stripe.js has loaded.
    return null;
  }

  const setMessage = (message: string) => {
    _setMessages(`${messages}\n\n${message}`);
  };

  const INCOMPLETE = subscription?.status === "incomplete";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    _setMessages("");
    e.preventDefault();

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements?.getElement(CardElement);

    if (!stripe || !elements || !cardElement) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Use card Element to tokenize payment details
    let { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: "Jane Doe",
          },
        },
      }
    );

    if (error && "message" in error && typeof error.message === "string") {
      // show error and collect new card details.
      setMessage(error.message);
      return;
    }

    if (paymentIntent) {
      setPaymentIntent(paymentIntent);
    }
  }

  if (paymentIntent && paymentIntent.status === "succeeded") {
    push("/account");
  }

  return (
    <div className="w-full flex min-h-screen h-full bg-base-200">
      <div className="w-1/2 h-full p-10 space-y-5 flex flex-col">
        <h1 className="text-3xl font-bold ">Payment</h1>
        {INCOMPLETE && (
          <div>
            <p>Payment is incomplete</p>
            <form onSubmit={handleSubmit}>
              <CardElement
                options={{
                  classes: {
                    base: "text-sm p-2 border border-gray-300 rounded-md bg-slate-800 selection:bg-black",
                    invalid: "text-red-500",
                  },
                }}
              />
              <div className="my-2">
                <Button buttonType="submit" type="primary">
                  Submit Payment
                </Button>
              </div>
              <div className="p-4 bg-red-200 text-red-800">{messages}</div>
            </form>
          </div>
        )}
      </div>
      <div className="w-1/2 h-full"></div>
    </div>
  );
};

export default Payment;
