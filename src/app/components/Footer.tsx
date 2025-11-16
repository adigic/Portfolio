// app/components/Footer.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

import { Icon } from "@iconify/react";
import DownloadCV from "./DownloadCV";

export default function Footer() {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const goTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Convert FormData -> URL-encoded string without any casts
  function encodeFormData(data: FormData): string {
    const params = new URLSearchParams();
    data.forEach((value, key) => {
      // We only have text inputs/textarea here; stringify defensively
      params.append(key, typeof value === "string" ? value : String(value));
    });
    return params.toString();
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setSent(false);

    const form = e.currentTarget;
    const fd = new FormData(form);

    // Ensure Netlify form name is present
    if (!fd.get("form-name")) fd.set("form-name", "contact");

    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeFormData(fd),
      });

      if (!res.ok) throw new Error("Netlify submission failed");

      form.reset();
      setSent(true);

      // Safely access grecaptcha without any casts or ts-ignore
      const w: typeof window & { grecaptcha?: { reset: () => void } } = window as never;
      w.grecaptcha?.reset();
    } catch (err) {
      console.error(err);
      alert("Något gick fel. Försök igen.");
    } finally {
      setSubmitting(false);
      // Revert “Skickat” after a few seconds
      window.setTimeout(() => setSent(false), 4000);
    }
  }

  return (
    <footer data-nav-theme="light" id="kontakt" className="snap-start snap-always relative bg-brand-light  text-brand font-poppins">
      <div className="py-10">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10 pb-10 pt-16">


        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left: form */}
          <div className="md:col-span-7 order-2 md:order-1">
            <h3 className="text-xl font-semibold mb-4 border-b-2 border-accent w-fit">Contact Me</h3>

            <form
              name="contact"
              method="POST"

              onSubmit={onSubmit}
              className="space-y-4"
            >
              {/* Netlify essentials */}
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <label>
                  Don’t fill this out: <input name="bot-field" />
                </label>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  name="name"
                  type="text"
                  placeholder="NAME"
                  required
                  className="w-full rounded-none bg-brand-input px-4 py-3 text-sm placeholder-dark outline-none ring-1 ring-accent/20 focus:ring-accent"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="E-MAIL"
                  required
                  className="w-full rounded-none bg-brand-input px-4 py-3 text-sm placeholder-dark outline-none ring-1 ring-accent/20 focus:ring-accent"
                />
              </div>

              <textarea
                name="message"
                rows={5}
                placeholder="YOUR MESSAGE…"
                required
                className="w-full m-0 rounded-none bg-brand-input px-4 py-3 text-sm placeholder-dark outline-none ring-1 ring-accent/20 focus:ring-accent"
              />

              {/* Netlify reCAPTCHA widget */}
              <div data-netlify-recaptcha="true" className="my-2" />

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={goTop}
                  className="inline-flex items-center gap-2 border border-accent px-3 py-2 text-xs tracking-wide hover:bg-accent hover:text-brand-light cursor-pointer text-accent"
                >
                  <Icon
                    icon="mdi:chevron-double-up"
                    width={18}
                    height={18}
                    aria-hidden
                    className=""
                  />
                  <p className="text-sm ">BACK TO THE TOP</p>
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-accent text-white px-4 py-2 text-sm tracking-wide hover:opacity-90 disabled:opacity-60 cursor-pointer"
                >
                  {sent ? "MESSAGE SENT" : submitting ? "SENDING…" : "SEND MESSAGE"}
                </button>
              </div>

              {/* Info om personuppgifter */}
              <p className="mt-2 text-xs text-brand">
                We use your information to respond to your request. Read more in our{" "}
                <Link href="/integritypolicy" className="underline underline-offset-2">
                  integritypolicy
                </Link>
                .
              </p>
            </form>
          </div>

          {/* Right: details */}
          <div className="md:col-span-5 md:ml-25 order-1 md:order-2  bg-brand-input p-5 md:p-0 md:bg-transparent ">
            <h4 className="text-xl pb-1 font-semibold border-b-2 w-fit border-accent">Adis Hegic</h4>
            <p className="text-sm font-medium  ">Frontend Developer</p>

            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Icon
                  icon="game-icons:position-marker"
                  width={18}
                  height={18}
                  aria-hidden
                  className=""
                />
                <span>VÄSTERÅS, SWEDEN</span>
              </li>
              <li className="flex items-center gap-3">
                <Icon
                  icon="solar:phone-bold"
                  width={18}
                  height={18}
                  aria-hidden
                  className=""
                />
                <a href="tel:+46700788788" className="hover:underline">
                  +46 700 788 788
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Icon
                  icon="bi:envelope-at-fill"
                  width={18}
                  height={18}
                  aria-hidden
                  className=""
                />
                <a href="mailto:adigic@hotmail.com" className="hover:underline">
                  adigic@hotmail.com
                </a>
              </li>
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="https://www.linkedin.com/in/adishegic/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:opacity-80"
              >
                <Icon icon="simple-icons:linkedin" width={28} height={28} />
              </Link>
<DownloadCV/>
              
            </div>
          </div>
        </div>
      </div>

      </div>

      <div className="bg-brand-input">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-5 text-xs  text-brand text-center font-jura">
          ©{" "}
          <Link
            href="https://www.digitalsolutions.adigic.se/"
            target="_blank"
            className="font-semibold text-brand font-jura "
          >
            2025 <span className="hover:text-brand/80">ADIGIC Digital Solutions</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
