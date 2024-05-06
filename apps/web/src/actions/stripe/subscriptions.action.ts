"use server";

import Stripe from "stripe";
import { getPriceByLookupKey } from "./prices.action";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function createSubscription({
  id,
  lookup_key,
  customer_id,
}: {
  id?: string;
  lookup_key?: Stripe.Price["lookup_key"];
  customer_id?: Stripe.Customer["id"];
}) {
  let price: Stripe.Price | null = null;

  if (lookup_key) {
    price = await getPriceByLookupKey(lookup_key);
  }

  if (id) {
    price = await stripe.prices.retrieve(id);
  }

  if (!price || !customer_id) {
    return null;
  }

  const session = await stripe.subscriptions.create({
    payment_behavior: "default_incomplete",
    items: [
      {
        price: price.id,
      },
    ],
    customer: customer_id,
    expand: ["latest_invoice.payment_intent"],
  });

  return session;
}

export async function getSubscription(id: string) {
  const subscriptions = await stripe.subscriptions.retrieve(id);

  return subscriptions;
}
