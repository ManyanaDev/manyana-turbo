"use client";

import { Button, InputGroup } from "@repo/ui/*";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { IRegisterForm } from "@repo/shared/types";
// import { signIn } from "next-auth/react";

const RegisterForm = () => {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);

  const now = Date.now();
  const form = useForm<IRegisterForm>({
    defaultValues: {
      first_name: "Test",
      last_name: `McTestFace_${now}`,
      email: `user-${now}@test.com`,
      business_name: `ACME Inc. ${now}`,
      password: "Password1!",
      password_confirm: "Password1!",
    },
  });

  const {
    formState: { errors },
  } = form;

  async function handleSubmit(data: IRegisterForm) {
    const signIn = (await import("next-auth/react")).signIn;
    setLoading(true);

    const res = await signIn("signup", {
      // USER ----------------------------------------
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password,
      // MERCHANT ------------------------------------
      business_name: data.business_name,
      // ---------------------------------------------
      callbackUrl: "/register/sponsor-selection",
      redirect: false,
    })
      .catch((error) => {
        console.log("error :>> ", error);
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An error occurred");
        }
      })
      .finally(() => {
        setLoading(false);
      });

    if (res?.error) {
      return toast.error(res?.error);
    }

    if (res?.ok && res?.url) {
      toast.success("Registration successful");
      return push(res?.url);
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className={classNames("grid grid-cols-2 w-full gap-2 text-sm", {
        "opacity-70 pointer-events-none": loading,
      })}
    >
      <InputGroup
        label="First name"
        register={form.register("first_name", {
          required: {
            message: "",
            value: true,
          },
        })}
        errors={errors.first_name}
        containerClassName="col-span-1"
      />
      <InputGroup
        label="Last Name"
        register={form.register("last_name", {
          required: {
            message: "",
            value: true,
          },
        })}
        errors={errors.last_name}
        containerClassName="col-span-1"
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
      <div className="pt-10 col-span-2">
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
      <div className="col-span-2 pt-4 text-right text-xs">
        Already have an account?{" "}
        <Link href={"/login"} className="text-success hover:text-success/50">
          Log in
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
