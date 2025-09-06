// src/app/[locale]/layout.tsx
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";
import { Navbar } from "@/components/Navbar";
import { Poppins } from "next/font/google";

export const metadata: Metadata = {
  title: "Your Name — Portfolio",
  description: "Designer/Developer portfolio",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  // optional niceties:
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  // 👇 In Next.js 15, params is a Promise
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params; // 👈 await it
  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <html lang={locale} className='{poppins.className} mx-8 mt-2 '>
      <body className="">
        {/* Messages are provided via src/i18n/request.ts */}
        <NextIntlClientProvider>
          <Navbar />
          <main className="container pt-8 pb-24">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
