"use client";

import { Button, InputGroup } from "@repo/ui/InputGroup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import Link from "next/link";
import { forgotPassword } from "../../../actions/auth/forgot-password.action";

export interface User {
  email: string;
}

const ForgotPasswordForm = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<User>({
    defaultValues: {
      email: "test-user@test.com",
    },
  });

  const {
    formState: { errors },
  } = form;

  async function onSubmit(data: User) {
    setLoading(true);
    try {
      await forgotPassword(data);
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
        label="Email"
        inputType="email"
        register={form.register("email", {
          required: {
            message: "",
            value: true,
          },
        })}
        errors={errors.email}
      />
      <div className="pt-10 flex w-full">
        <Button
          type="success"
          size="md"
          outline
          buttonType="submit"
          className="w-full"
        >
          Send reset email
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

export default ForgotPasswordForm;
