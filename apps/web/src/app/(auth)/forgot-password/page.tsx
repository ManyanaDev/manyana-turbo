import React from "react";
import ForgotPasswordForm from "../../../components/forms/auth/forgot-password";

const page = () => {
  return (
    <div className="h-screen flex bg-gray-800">
      <div className="w-1/2 p-20">
        <h1 className="text-white text-3xl font-bold mb-2">
          Forgot your password?
        </h1>
        <p>Happens to the best of us</p>
        <ForgotPasswordForm />
      </div>
      <div className="w-1/2 bg-gradient-to-bl from-pink-400 to-blue-900"></div>
    </div>
  );
};

export default page;
