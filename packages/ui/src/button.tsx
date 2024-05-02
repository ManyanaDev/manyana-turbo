"use client";

import classNames from "classnames";
import { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps {
  children?: ReactNode;
  className?: string;
  buttonType?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  type?:
    | "neutral"
    | "primary"
    | "secondary"
    | "accent"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "ghost"
    | "link";
  size?: "lg" | "md" | "sm" | "xs";
  outline?: boolean;
}

export const Button = ({
  children,
  className,
  buttonType = "button",
  type,
  size,
  outline,
}: ButtonProps) => {
  const classname = classNames("btn", className, {
    "btn-neutral": type === "neutral",
    "btn-primary": type === "primary",
    "btn-secondary": type === "secondary",
    "btn-accent": type === "accent",
    "btn-info": type === "info",
    "btn-success": type === "success",
    "btn-warning": type === "warning",
    "btn-error": type === "error",
    "btn-ghost": type === "ghost",
    "btn-link": type === "link",
    "btn-outline": outline,
    "btn-lg": size === "lg",
    "btn-md": size === "md",
    "btn-sm": size === "sm",
    "btn-xs": size === "xs",
  });

  return (
    <button className={classname} type={buttonType}>
      {children}
    </button>
  );
};
