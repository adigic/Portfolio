import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/Navbar";
import { BackToTop } from "@/components/BackToTop";

export const metadata: Metadata = {
  title: "Portfolio | Adis Hegic",
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

  let messages: Record<string, unknown>;
  try {
    messages = (await import(`../../messages/${locale}/common.json`)).default;
  } catch {
    messages = (await import(`../../messages/en/common.json`)).default;
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {/* Non-sticky navbar in normal document flow */}
<header className="w-full relative z-10">
  <div className="max-w-7xl mx-auto md:px-6 ">
    <Navbar />
  </div>
</header>

      <main className="w-full">{children}</main>

      {/* Floating back-to-top (CSS auto-inverts if you used the mix-blend version) */}
      <BackToTop showAfter={200} />
    </NextIntlClientProvider>
  );
}
