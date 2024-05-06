import { Header } from "@repo/ui/header";
import React, { ReactNode } from "react";

const AppLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default AppLayout;
