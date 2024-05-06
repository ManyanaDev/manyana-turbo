/* eslint-disable no-unused-vars */
import { RadioCard } from "./RadioCard";
import type { IPriceOption } from "@repo/shared/types";

export interface RadioCardsProps {
  options: Array<IPriceOption>;
  selected: string;
  setSelected: (value: string) => void;
}

export const RadioCards = ({
  options,
  selected,
  setSelected,
}: RadioCardsProps) => {
  return (
    <div className="ui-space-y-5">
      {options?.map((option) => {
        return (
          <RadioCard
            label={option.label}
            key={option.value}
            value={option.value}
            selected={selected === option.value}
            onClick={setSelected}
            description={option.description}
            price={
              <div className="ui-text-3xl ui-text-right">
                <span className="ui-font-bold">{option.amount}</span>
                <div className="ui-text-sm">Per month</div>
                {option.recurrence === "year" && (
                  <div className="ui-text-sm">Billed annually</div>
                )}
              </div>
            }
          />
        );
      })}
    </div>
  );
};
