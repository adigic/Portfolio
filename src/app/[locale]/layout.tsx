// src/app/[locale]/layout.tsx
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";

export const metadata: Metadata = {
  title: "Your Name — Portfolio",
  description: "Designer/Developer portfolio",
};

// (Optional but nice for SSG of /en and /sv)
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  // If you're on Next 14, change the type to: params: { locale: string }
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }


  let messages: Record<string, any>;
  try {

    messages = (await import(`../../messages/${locale}/common.json`)).default;
  } catch {
    messages = (await import(`../../messages/en/common.json`)).default;
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
        <main className="mx-10 pb-24">
      
        
        <div className="w-full">
          <Navbar />
          <section className="snap-start min-h-[100dvh] w-full py-14 md:py-20">
            <Hero />
          </section>
<section className="snap-start min-h-[100dvh] w-full py-14 md:py-20">
            <Hero />
          </section>

        </div>
     
      </main>
    </NextIntlClientProvider>
  );
}
