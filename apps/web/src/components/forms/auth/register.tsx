"use client";

import { Button, InputGroup, toastPromise } from "@repo/ui/*";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { register } from "../../../actions/auth/register.action";
import classNames from "classnames";
import Link from "next/link";
import { Merchant, User } from "@repo/shared/types";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<User & Merchant>({
    defaultValues: {
      name: "Test",
      email: `user-${Date.now()}@test.com`,
      business_name: "ACME Inc.",
      password: "Password1!",
      password_confirm: "Password1!",
    },
  });

  const {
    formState: { errors },
  } = form;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    toastPromise({
      func: form.handleSubmit((data) =>
        register(data).finally(() => {
          setLoading(false);
        })
      ),
      pending: {
        title: "Registering",
        message: "Please wait",
      },
      success: {
        title: "Registration successful",
        message: "Please check your email for a confirmation link",
        callback: async function () {
          push("/register/sponsor-selection");
        },
      },
      error: {
        title: "Registration failed",
        message: "Registration failed",
      },
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={classNames("flex flex-col w-full space-y-2 text-sm", {
        "opacity-70 pointer-events-none": loading,
      })}
    >
      <InputGroup
        label="Name"
        register={form.register("name", {
          required: {
            message: "",
            value: true,
          },
        })}
        errors={errors.name}
      />

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
      <InputGroup
        label="Business name"
        register={form.register("business_name", {
          required: {
            message: "",
            value: true,
          },
        })}
        errors={errors.business_name}
      />
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
        errors={errors.password}
      />
      <div className="pt-10 flex w-full">
        <Button
          type="success"
          size="md"
          outline
          buttonType="submit"
          className="w-full"
        >
          Register
        </Button>
      </div>
      <div className="w-full pt-4 text-right text-xs">
        Already have an account?{" "}
        <Link href={"/login"} className="text-success hover:text-success/50">
          Log in
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
