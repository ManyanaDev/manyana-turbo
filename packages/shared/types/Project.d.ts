import { Projects, UN_SDG } from "./Merchant";
import Stripe from "stripe";

export interface ProjectList {
  id: Projects | UN_SDG;
  title: string;
  description: string;
  slug: string;
}

export interface IPriceOption {
  value: string;
  label: string | null;
  description: string | null;
  amount: number | string | null;
  unit_amount: Stripe.Price["unit_amount"];
  unit_amount_currency: string | null;
  recurrence: Stripe.Price.Recurring.Interval | undefined;
  lookup_key: string;
}

export type Recurrence = Exclude<
  Stripe.Price.Recurring["interval"],
  "day" | "week"
>;

export type IPricingStructure = Record<Recurrence, IPriceOption[]>;
