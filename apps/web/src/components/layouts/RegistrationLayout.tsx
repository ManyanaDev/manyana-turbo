import React, { ReactNode } from "react";

const RegistrationLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <div>
      <h1>Registration</h1>
      {children}
    </div>
  );
};

export default RegistrationLayout;
