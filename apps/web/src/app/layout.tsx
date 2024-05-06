import "./globals.css";
import "@repo/ui/styles.css";

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
      <body className="">{children}</body>
    </html>
  );
}
