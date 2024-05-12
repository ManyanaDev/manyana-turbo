"use client";

import classNames from "classnames";
import { InputHTMLAttributes, ReactNode } from "react";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";

export interface InputGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  inputType?: InputHTMLAttributes<HTMLInputElement>["type"];
  register?: UseFormRegisterReturn;
  errors?: FieldError;
  displayValue?: ReactNode;
  containerClassName?: string;
}

export const InputGroup = ({
  label,
  inputType = "text",
  register,
  errors,
  displayValue,
  containerClassName = "ui-col-span-2",
  ...rest
}: InputGroupProps) => {
  return (
    <div className={classNames(containerClassName)}>
      <label className="ui-form-control ui-w-full">
        <div className="ui-label">
          <span
            className={classNames("ui-label-text ui-text-xs", {
              "ui-text-error": errors,
            })}
          >
            {label}
            {errors && <span className=""> is required</span>}
          </span>
          {displayValue && (
            <span className="ui-text-xs ui-text-gray-500">{displayValue}</span>
          )}
        </div>
        <input
          {...rest}
          type={inputType}
          placeholder="Type here"
          className={classNames("ui-w-full", {
            "ui-input ui-input-bordered ui-input-md":
              inputType === "text" ||
              inputType === "email" ||
              inputType === "password" ||
              inputType === "number",
            "ui-range": inputType === "range",
            "ui-input-error": errors,
          })}
          {...register}
        />
      </label>
    </div>
  );
};

export default InputGroup;
