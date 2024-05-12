"use client";
import { Header } from "@repo/ui/Header";
import React from "react";
import { logout } from "../../actions/auth/logout.action";

const Navbar = () => {
  return (
    <Header
      links={[
        {
          label: "Dashboard",
          onClick: () => console.log("Dashboard"),
        },
        {
          label: "Account",
          onClick: () => console.log("Account"),
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
