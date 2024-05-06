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
  onClick?: () => void;
  disabled?: boolean;
  id?: string;
}

export const Button = ({
  children,
  className,
  buttonType = "button",
  type,
  size,
  outline,
  onClick,
  disabled,
  id,
}: ButtonProps) => {
  const classname = classNames("ui-btn", className, {
    "ui-btn-neutral": type === "neutral",
    "ui-btn-primary": type === "primary",
    "ui-btn-secondary": type === "secondary",
    "ui-btn-accent": type === "accent",
    "ui-btn-info": type === "info",
    "ui-btn-success": type === "success",
    "ui-btn-warning": type === "warning",
    "ui-btn-error": type === "error",
    "ui-btn-ghost": type === "ghost",
    "ui-btn-link": type === "link",
    "ui-btn-outline": outline,
    "ui-btn-lg": size === "lg",
    "ui-btn-md": size === "md",
    "ui-btn-sm": size === "sm",
    "ui-btn-xs": size === "xs",
    "ui-btn-disabled": disabled,
  });

  return (
    <button className={classname} type={buttonType} onClick={onClick} id={id}>
      {children}
    </button>
  );
};
