// app/integrity/page.tsx
import type { Metadata } from "next";
import CookieSettingsButton from "../components/CookieSettingsButton";

export const metadata: Metadata = {
  title: "Privacy Policy | Portfolio",
  description:
    "Information about how personal data and cookies are handled on this portfolio site.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-brand text-brand-light">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Title */}
        <header className="mb-8">
          <h1 className="text-3xl font-semibold text-brand-light">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm md:text-base text-brand-light/90 leading-relaxed">
            This privacy policy explains how personal data is handled when you
            use this portfolio website or contact me. I care about your privacy
            and only collect the information necessary to respond to inquiries
            and understand how the website is used.
          </p>
        </header>

        {/* CONTROLLER */}
        <section className="mt-8">
          <h2 className="text-lg md:text-xl font-semibold text-brand-light mb-3">
            Data Controller
          </h2>
          <p className="text-sm md:text-base text-brand-light/90 leading-relaxed">
            <span className="font-semibold">Owner of this portfolio website</span>
            <br />
            Sweden
            <br />
            Email:{" "}
            <a
              href="mailto:adigic@hotmail.com"
              className="underline underline-offset-2 hover:text-brand-light transition-colors"
            >
              adigic@hotmail.com
            </a>
          </p>
        </section>

        {/* CONTACT FORM */}
        <section className="mt-10">
          <h2 className="text-lg md:text-xl font-semibold text-brand-light mb-3">
            Information you provide via the contact form
          </h2>
          <p className="text-sm md:text-base text-brand-light/90 mb-3 leading-relaxed">
            When you send a message through the contact form, the personal data
            you provide is processed, such as:
          </p>
          <ul className="text-sm md:text-base text-brand-light/90 list-disc list-inside mb-4 space-y-1">
            <li>Name</li>
            <li>Email address</li>
            <li>Message</li>
          </ul>
          <p className="text-sm md:text-base text-brand-light/90 leading-relaxed mb-4">
            This information is only used to respond to your inquiry and to
            communicate about potential collaborations, projects, or questions
            related to my work.
          </p>
          <p className="text-sm md:text-base text-brand-light/90 leading-relaxed">
            Your details are not kept longer than necessary to handle your
            message and any continued conversation.
          </p>
        </section>

        {/* COOKIES / ANALYTICS */}
        <section className="mt-10">
          <h2 className="text-lg md:text-xl font-semibold text-brand-light mb-3">
            Cookies and analytics
          </h2>
          <p className="text-sm md:text-base text-brand-light/90 mb-4 leading-relaxed">
            To understand how the website is used and to improve the content and
            user experience, analytics tools such as Google Analytics may be
            used. These tools use cookies to collect anonymised statistics, for
            example:
          </p>

          <ul className="text-sm md:text-base text-brand-light/90 list-disc list-inside mb-4 space-y-1">
            <li>Which pages are visited</li>
            <li>How long visitors stay on the site</li>
            <li>What type of device and browser is used</li>
          </ul>

          <p className="text-sm md:text-base text-brand-light/90 leading-relaxed mb-4">
            Analytics cookies are only set after you have given your consent via
            the cookie banner.
          </p>

          <p className="text-sm md:text-base text-brand-light/90 leading-relaxed mb-2">
            If you want to change your previous choice, you can reopen the
            cookie banner below.
          </p>

          <CookieSettingsButton />
        </section>

        {/* RIGHTS */}
        <section className="mt-10">
          <h2 className="text-lg md:text-xl font-semibold text-brand-light mb-3">
            Your rights
          </h2>
          <p className="text-sm md:text-base text-brand-light/90 leading-relaxed mb-4">
            You have the right to request information about the personal data
            that is processed about you. You can also request correction or
            deletion of your data, as far as this is possible under applicable
            law.
          </p>

          <p className="text-sm md:text-base text-brand-light/90 leading-relaxed">
            If you have any questions about how your personal data is handled,
            or if you want to exercise your rights, please contact me via email.
          </p>
        </section>

        <p className="text-[11px] text-brand-light/70 mt-10">
          Last updated: {new Date().toLocaleDateString("en-GB")}
        </p>
      </div>
    </main>
  );
}
