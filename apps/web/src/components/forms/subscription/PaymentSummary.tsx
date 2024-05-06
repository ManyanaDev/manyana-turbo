import { projectList } from "@repo/shared/src";
import { IPriceOption } from "@repo/shared/types";
import { Button } from "@repo/ui/button";

export function PaymentSummary({
  allocations,
  selected,
}: {
  allocations: Record<string, number>;
  selected?: IPriceOption;
}) {
  return (
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
          // onClick={handleSubscription}
        >
          Confirm and Pay
        </Button>
      </div>
    </div>
  );
}
