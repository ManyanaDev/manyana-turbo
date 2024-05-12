import React from "react";
import RegisterForm from "../../../components/forms/auth/register";

import RegistrationLayout from "../../../components/layouts/RegistrationLayout";

const page = () => {
  return (
    <RegistrationLayout>
      <h1 className="text-white text-3xl font-bold mb-2">Sign up</h1>
      <RegisterForm />
    </RegistrationLayout>
  );
};

export default page;
