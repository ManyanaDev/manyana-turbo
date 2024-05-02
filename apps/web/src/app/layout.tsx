import "./globals.css";
import "@repo/ui/styles.css";

import { Header } from "@repo/ui/header";
import type { Metadata } from "next";

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
      <body className="bg-black">
        {/* <Header /> */}
        {children}
      </body>
    </html>
  );
}
