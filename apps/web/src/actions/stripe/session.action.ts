import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function createCheckoutSession({ id }: { id: string }) {
  const checkoutSession = await stripe.checkout.sessions.retrieve(id);
  console.log("checkoutSession :>> ", checkoutSession);
  if (
    !checkoutSession.customer ||
    typeof checkoutSession.customer !== "string"
  ) {
    return null;
  }

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: checkoutSession.customer,
    // return_url: `${"http://localhost:3000"}/billing/portal`,
    return_url: "https://billing.stripe.com/p/login/14kdR3grC1yH1b27ss",
  });

  return portalSession;
}
