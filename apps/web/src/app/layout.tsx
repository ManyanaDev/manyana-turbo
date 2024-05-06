import "./globals.css";
import "@repo/ui/styles.css";
// minified version is also included
import "react-toastify/dist/ReactToastify.min.css";

import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Manyana | Home",
  description: "Welcome to Manyana",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className="">
        {children}
        <ToastContainer theme="dark" />
      </body>
    </html>
  );
}
