// src/app/[locale]/layout.tsx
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ThemedHeader } from "@/components/ThemedHeader";

export const metadata: Metadata = {
  title: "Your Name — Portfolio",
  description: "Designer/Developer portfolio",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  let messages: Record<string, any>;
  try {
    messages = (await import(`../../messages/${locale}/common.json`)).default;
  } catch {
    messages = (await import(`../../messages/en/common.json`)).default;
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {/* 🔑 Dedicated scroll container that holds BOTH header and sections */}
      <div
        id="scrollRoot"
        className="
          h-[100dvh] overflow-y-auto scroll-smooth
          snap-y md:snap-proximity lg:snap-mandatory
          motion-reduce:snap-none motion-reduce:scroll-auto
          overscroll-y-none
        "
      >
        <ThemedHeader />
        <main className="w-full">{children}</main>
      </div>
    </NextIntlClientProvider>
  );
}
