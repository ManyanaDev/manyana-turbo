"use client";
import { Header } from "@repo/ui/Header";
import { useRouter } from "next/navigation";
import React from "react";
import { logout } from "../../actions/auth/logout.action";

const Navbar = () => {
  const { push } = useRouter();
  return (
    <Header
      links={[
        {
          label: "Dashboard",
          onClick: () => push("/"),
        },
        {
          label: "Account",
          onClick: () => push("/account"),
        },
        {
          label: "Projects",
          onClick: () => push("/projects"),
        },
        {
          label: "Sign Out",
          onClick: () => logout(),
        },
      ]}
    />
  );
};

export default Navbar;
