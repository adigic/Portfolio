import type { Metadata } from "next";
import "./globals.css";
import { Poppins, Alexandria, Righteous } from "./fonts";

export const metadata: Metadata = {
  title: "Portfolio | Adis Hegic",
  description: "Designer/Developer portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`
          ${Poppins.variable}
          ${Alexandria.variable}
          ${Righteous.variable}
          font-sans
        `}>
        {children}
      </body>
    </html>
  );
}
