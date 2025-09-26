import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Your Name — Portfolio",
  description: "Designer/Developer portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* BODY is clean; the snap-scroller lives in the locale layout */}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen max-w-7xl mx-auto`}>
        {children}
      </body>
    </html>
  );
}
