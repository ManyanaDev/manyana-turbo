import React, { ReactNode } from "react";
import Navbar from "./Navbar";

const AppLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default AppLayout;
