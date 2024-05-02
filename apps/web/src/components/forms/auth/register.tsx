"use client";

import { Button, InputGroup } from "@repo/ui/InputGroup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { register } from "../../../actions/auth/register.action";
import classNames from "classnames";

export interface User {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
}

export interface Merchant {
  business_name: string;
}

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<User & Merchant>({
    defaultValues: {
      name: "Test",
      email: "test-user@test.com",
      business_name: "ACME Inc.",
      password: "Password1!",
      password_confirm: "Password1!",
    },
  });

  const {
    formState: { errors },
  } = form;

  async function onSubmit(data: User & Merchant) {
    setLoading(true);
    try {
      await register(data);
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
          Success
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;