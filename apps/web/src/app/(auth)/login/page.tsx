import React from "react";
import LoginForm from "../../../components/forms/auth/login";

const page = () => {
  return (
    <div className="h-screen flex bg-gray-800">
      <div className="w-1/2 p-20">
        <h1 className="text-white text-3xl font-bold mb-2">Sign in</h1>
        <LoginForm />
      </div>
      <div className="w-1/2 bg-gradient-to-bl from-pink-400 to-blue-900"></div>
    </div>
  );
};

export default page;
