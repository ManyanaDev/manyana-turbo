"use client";
import React from "react";
import { signOut } from "../../auth";

const SignOut = () => {
  return (
    <button
      type="button"
      onClick={() =>
        signOut({
          redirectTo: "/login",
        })
      }
    >
      Sign out
    </button>
  );
};

export default SignOut;
