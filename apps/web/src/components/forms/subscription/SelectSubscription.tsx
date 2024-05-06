"use client";

import React, { useEffect, useState } from "react";

import classNames from "classnames";
import { Button, RadioCards } from "@repo/ui/RadioCards";
import { IPricingStructure, Recurrence } from "@repo/shared/types";
import { projectList } from "@repo/shared/src";
import { createSubscription } from "../../../actions/stripe/subscriptions.action";
import { useRouter } from "next/navigation";
import { createCustomer } from "../../../actions/stripe/customer.action";

const SelectSubscription = ({
  options,
  allocations,
}: {
  options: IPricingStructure;
  allocations: Record<string, number>;
}) => {
  const router = useRouter();
  const [recurrence, setRecurrence] = useState<Recurrence>("year");
  const [plan, setPlan] = useState<string>("investor_annually");

  const selected = options[recurrence].find((o) => o.value === plan);

  useEffect(() => {
    if (options[recurrence][1]) {
      setPlan(options[recurrence][1].value);
    }
  }, [recurrence]);

  async function handleSubscription() {
    try {
      const customer = await createCustomer({
        email: `test-${Date.now()}@example.com`,
      });

      const subscription = await createSubscription({
        lookup_key: plan,
        customer_id: customer.id,
      });

      const latest_invoice = subscription?.latest_invoice;
      const client_secret =
        typeof latest_invoice !== "string" &&
        typeof latest_invoice?.payment_intent !== "string" &&
        latest_invoice?.payment_intent?.client_secret;

      if (subscription?.id && client_secret) {
        return router.push(
          `/billing/payment?sub_id=${subscription.id}&cs=${client_secret}`
        );
      }

      console.log("subscription :>> ", subscription);
    } catch (error) {
      console.log("error :>> ", error);
    }
  }

  return (
    <div className="w-full flex min-h-screen h-full bg-base-200">
      <div className="w-1/2 h-full p-10 space-y-5 flex flex-col">
        <h1 className="text-3xl font-bold">Checkout</h1>
        <div className="flex gap-x-2">
          <div role="tablist" className="tabs tabs-boxed capitalize mx-auto">
            {Object.keys(options).map((t) => (
              <a
                key={t}
                role="tab"
                className={classNames("tab w-32", {
                  "tab-active": recurrence === t,
                })}
                onClick={() => setRecurrence(t as Recurrence)}
              >
                {t}
              </a>
            ))}
          </div>
        </div>
        <div>
          <RadioCards
            options={options[recurrence]}
            selected={plan}
            setSelected={setPlan}
          />
        </div>
      </div>
      <div className="w-1/2 bg-gradient-to-tr from-blue-800 to-pink-800 flex items-center justify-center">
        <div className="p-8 bg-lime-100 shadow-lg rounded-lg space-y-4">
          <h2 className="text-2xl text-slate-600 font-bold">Payment Summary</h2>
          <div>
            <h3 className="text-xl text-slate-600">Sponsor Allocation</h3>
            {Object.entries(allocations).map(([key, v]) => {
              const project = projectList.find((p) => p.id === key);
              const value = (Number(v) / 100).toLocaleString("en-US", {
                style: "percent",
                currency: "GBP",
              });

              if (!project) {
                return null;
              }

              return (
                <div
                  key={key}
                  className="flex justify-between gap-x-4 text-slate-400 text-xs"
                >
                  <span>{project.title}</span>
                  <span>{value}</span>
                </div>
              );
            })}
          </div>
          {selected && (
            <div>
              <h3 className="text-xl text-slate-600">Subscription</h3>
              <div className="flex flex-col justify-between gap-x-4">
                <span>{selected?.label}</span>
                <span>{selected?.amount} per month</span>
                <span className="font-bold text-base-200 mt-2">
                  {selected.unit_amount &&
                    Intl.NumberFormat("en", {
                      currency: selected.unit_amount_currency || "GBP",
                      style: "currency",
                    }).format(selected.unit_amount / 100)}
                  <span className="pl-1">payable now</span>
                </span>
              </div>
            </div>
          )}
          <div>
            <Button
              size="sm"
              className="w-full"
              type="accent"
              onClick={handleSubscription}
            >
              Confirm and Pay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectSubscription;
