import React, { ReactNode } from "react";

const RegistrationLayout = ({
  children,
  right,
}: {
  children?: ReactNode;
  right?: ReactNode;
}) => {
  return (
    <div className="min-h-screen flex bg-base-100">
      <div className="w-1/2 p-20">{children}</div>
      <div className="w-1/2 bg-gradient-to-bl from-pink-400 to-blue-900 flex items-center justify-center">
        {right}
      </div>
    </div>
  );
};

export default RegistrationLayout;
