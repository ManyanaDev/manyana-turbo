"use client";

import { Button, InputGroup } from "@repo/ui/InputGroup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import Link from "next/link";

import { resetPassword } from "../../../actions/auth/forgot-password.action";

export interface ResetPasswordData {
  password: string;
  password_confirm: string;
}

const PasswordResetForm = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<ResetPasswordData>({
    defaultValues: {
      password: "Password1!",
      password_confirm: "Password1!",
    },
  });

  const {
    formState: { errors },
  } = form;

  async function onSubmit(data: ResetPasswordData) {
    setLoading(true);
    try {
      await resetPassword(data);
    } catch (error) {
      console.log("error :>> ", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={classNames("flex flex-col w-full space-y-2 text-sm", {
        "opacity-70 pointer-events-none": loading,
      })}
    >
      <InputGroup
        label="Password"
        inputType="password"
        register={form.register("password", {
          required: {
            message: "",
            value: true,
          },
        })}
        errors={errors.password}
      />
      <InputGroup
        label="Confirm Password"
        inputType="password"
        register={form.register("password_confirm", {
          required: {
            message: "",
            value: true,
          },
        })}
        errors={errors.password_confirm}
      />
      <div className="pt-10 flex w-full">
        <Button
          type="success"
          size="md"
          outline
          buttonType="submit"
          className="w-full"
        >
          Reset password
        </Button>
      </div>

      <div className="pt-10 flex flex-col w-full">
        <p className="text-xs mb-2">Didn't receive an email?</p>
        <Button
          type="info"
          size="md"
          outline
          buttonType="submit"
          className="w-full"
        >
          Resend email
        </Button>
      </div>

      <div className="flex justify-between w-full pt-4 text-right text-xs">
        <div>
          <Link href={"/login"} className="text-success hover:text-success/50">
            Login
          </Link>
        </div>
        <div>
          Not joined us yet?
          <Link
            href={"/register"}
            className="text-success hover:text-success/50 ml-2"
          >
            Register
          </Link>
        </div>
      </div>
    </form>
  );
};

export default PasswordResetForm;
