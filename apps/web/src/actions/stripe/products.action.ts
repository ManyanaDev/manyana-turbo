import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function getProducts() {
  const products = await stripe.products.list();

  console.log("products :>> ", products);

  return products.data;
}
