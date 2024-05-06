"use server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function createCustomer({ email }: { email: string }) {
  const customer = await stripe.customers.create({
    email,
  });

  return customer;
}
