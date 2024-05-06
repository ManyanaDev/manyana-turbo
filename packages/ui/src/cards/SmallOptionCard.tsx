/* eslint-disable no-unused-vars */
import classNames from "classnames";
import React from "react";

interface SmallOptionCardProps {
  label: string;
  value: string;
  name: string;
  onClick?: (value: string) => void;
  selected?: boolean;
}

function generateHexFromId(id: string) {
  const base = parseInt(id, 20);
  console.log("base :>> ", base);
  const r = (base * 10) % 255;
  const g = (base * 20) % 255;
  const b = (base * 30) % 255;
  return `rgb(${r}, ${g}, ${b})`;
}

export const SmallOptionCard = ({
  label,
  value,
  name,
  onClick,
  selected,
}: SmallOptionCardProps) => {
  return (
    <div
      className={classNames(
        "ui-form-control ui-w-full ui-h-full ui-shadow-md ui-rounded-lg ui-p-4 ui-min-h-28 hover:ui-scale-105 ui-duration-100 ui-cursor-pointer",
        {
          "ui-bg-accent": selected,
          "ui-bg-slate-700": !selected,
        }
      )}
      onClick={() => onClick?.(value)}
    >
      <span className="ui-label-text ui-text-lg ui-text-gray-200 ui-leading-none">
        {label}
      </span>
    </div>
  );
};
