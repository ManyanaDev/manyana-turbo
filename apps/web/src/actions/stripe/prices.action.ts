import { IPriceOption, IPricingStructure } from "@repo/shared/types";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function getPriceByLookupKey(lookupKey: string) {
  const price = await stripe.prices.list({
    lookup_keys: [lookupKey],
    expand: ["data.product"],
    active: true,
  });

  if (!price?.data || price.data.length === 0) {
    return null;
  }

  return price.data[0] ?? null;
}

export async function getPrices() {
  const prices = await stripe.prices.list({
    expand: ["data.product"],
    active: true,
  });

  return prices.data;
}

function makePriceOption(price?: Stripe.Price): IPriceOption | null {
  if (!price) {
    return null;
  }

  let amount: string | number | null = price.unit_amount
    ? price.unit_amount / 100
    : null;

  if (amount && price.recurring?.interval === "year") {
    amount = amount / 12;
  }

  if (amount) {
    amount = Intl.NumberFormat("en", {
      style: "currency",
      currency: price.currency || "GBP",
    }).format(amount);
  }

  return {
    value: price.lookup_key || price.id,
    label:
      typeof price.product === "object" &&
      price.product &&
      "name" in price.product
        ? price.product.name
        : price.lookup_key,
    description:
      typeof price.product === "object" &&
      price.product &&
      "description" in price.product
        ? price.product.description
        : price.lookup_key,
    amount,
    unit_amount: price.unit_amount,
    unit_amount_currency: price.currency,
    recurrence: price.recurring?.interval,
    lookup_key: price.lookup_key || price.id,
  };
}

const month_order = ["basic_monthly", "investor_monthly", "premium_monthly"];
const year_order = ["basic_annually", "investor_annually", "premium_annually"];

export async function getPricesAsOptions(): Promise<IPricingStructure> {
  const prices = await getPrices();

  return {
    month:
      prices
        .reduce((acc, price) => {
          const obj = makePriceOption(price);
          if (!obj) {
            return acc;
          }
          if (price.recurring?.interval === "month") {
            acc.push(obj);
          }
          return acc;
        }, [] as IPriceOption[])
        .sort(
          (a, b) =>
            month_order.indexOf(a.lookup_key) -
            month_order.indexOf(b.lookup_key)
        ) || [],
    year:
      prices
        .reduce((acc, price) => {
          const obj = makePriceOption(price);
          if (!obj) {
            return acc;
          }
          if (price.recurring?.interval === "year") {
            acc.push(obj);
          }
          return acc;
        }, [] as IPriceOption[])
        .sort(
          (a, b) =>
            year_order.indexOf(a.lookup_key) - year_order.indexOf(b.lookup_key)
        ) || [],
  };
}
