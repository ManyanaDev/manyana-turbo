"use client";

import classNames from "classnames";
import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";

export interface InputGroupProps {
  label: string;
  inputType?: InputHTMLAttributes<HTMLInputElement>["type"];
  register?: UseFormRegisterReturn;
  errors?: FieldError;
}

export const InputGroup = ({
  label,
  inputType = "text",
  register,
  errors,
}: InputGroupProps) => {
  return (
    <div className="ui-w-full">
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
        </div>
        <input
          type={inputType}
          placeholder="Type here"
          className={classNames(
            "ui-input ui-input-bordered ui-w-full ui-input-md",
            {
              "ui-input-error": errors,
            }
          )}
          {...register}
        />
      </label>
    </div>
  );
};

export default InputGroup;
