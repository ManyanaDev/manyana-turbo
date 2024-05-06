/* eslint-disable no-unused-vars */
import classNames from "classnames";
import { ReactNode } from "react";

export interface RadioCardProps {
  label: string | null;
  value: string;
  children?: ReactNode;
  selected: boolean;
  onClick: (value: RadioCardProps["value"]) => void;
  price: ReactNode;
  description?: string | null;
}
export const RadioCard = ({
  label,
  children,
  selected,
  onClick,
  value,
  price,
  description,
}: RadioCardProps) => {
  return (
    <div
      className={classNames(
        "ui-w-full ui-p-5 ui-border-2 ui-rounded-xl ui-cursor-pointer ui-flex",
        {
          "ui-border-transparent ui-bg-accent ui-text-base-100": selected,
          "ui-border-slate-400": !selected,
        }
      )}
      onClick={() => onClick(value)}
    >
      <div className="ui-flex-col ui-justify-between ui-w-3/4">
        <label htmlFor="" className="text-2xl">
          {label}
        </label>
        {description && <div className="ui-text-sm">{description}</div>}
      </div>
      <div className="ui-flex-col ui-justify-between ui-w-1/4">{price}</div>
    </div>
  );
};
