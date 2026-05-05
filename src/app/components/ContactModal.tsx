"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";

import { useContext, useEffect } from "react";
import { ModalContext } from "./ModalContext";

export default function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
    const modalCtx = useContext(ModalContext);

    // When modal opens, close mobile menu if open
    useEffect(() => {
      if (open) {
        // Remove scroll lock from menu if present
        if (typeof window !== "undefined") {
          document.body.classList.remove("overflow-hidden");
        }
      }
    }, [open, modalCtx]);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  function encodeFormData(data: FormData): string {
    const params = new URLSearchParams();
    data.forEach((value, key) => {
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
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
      window.setTimeout(() => setSent(false), 4000);
    }
  }

  if (!open) return null;

  // Close modal on outside click or X
  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      onClose();
      if (modalCtx && modalCtx.setOpen) modalCtx.setOpen(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={handleOverlayClick}>
      <div className="bg-white rounded-sm shadow-2xl w-full max-w-3xl relative animate-fadeInDown flex flex-col md:flex-row p-0 md:p-0 overflow-hidden mx-8" onClick={e => e.stopPropagation()}>
        <button
          onClick={() => {
            onClose();
            if (modalCtx && modalCtx.setOpen) modalCtx.setOpen(false);
          }}
          className="absolute top-3 right-3 text-brand/60 hover:text-accent text-xl z-10 cursor-pointer"
          aria-label="Close"
        >
          <Icon icon="mdi:close" width={24} height={24} />
        </button>
        {/* Form */}
        <div className="w-full md:w-[60%] p-6 md:p-8 flex flex-col justify-center">
          <h3 className="text-xl font-bold text-brand mb-4">Contact Me</h3>
          <form name="contact" method="POST" onSubmit={onSubmit} className="space-y-4">
            <input type="hidden" name="form-name" value="contact" />
            <div className="flex flex-col gap-2">
              <input
                name="name"
                type="text"
                placeholder="Name"
                required
                className="w-full rounded bg-brand-input px-4 py-2 text-sm outline-none ring-1 ring-accent/20 focus:ring-accent"
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                required
                className="w-full rounded bg-brand-input px-4 py-2 text-sm outline-none ring-1 ring-accent/20 focus:ring-accent"
              />
              <textarea
                name="message"
                rows={7}
                placeholder="Your message..."
                required
                className="w-full rounded bg-brand-input px-4 py-2 text-sm outline-none ring-1 ring-accent/20 focus:ring-accent md:rows-4"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full cursor-pointer bg-accent text-white py-2 rounded font-semibold hover:opacity-90 disabled:opacity-60 transition"
            >
              {sent ? "Message sent!" : submitting ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
        {/* Contact info, professional layout */}
        <div className="hidden md:flex w-[40%] p-0 flex-col justify-end border-l border-accent/15 bg-brand-light">
          <div className="flex flex-col h-full justify-between items-stretch text-left px-8 py-10 gap-6 relative">
            <div>
              <span className="font-alexandria text-2xl font-bold tracking-tight uppercase block leading-tight">Adis Hegic</span>
              <span className="text-base font-medium text-brand/60 block leading-tight mt-0.5">Software Engineer</span>
            </div>
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex items-center gap-3 bg-white/60 rounded px-3 py-2 shadow-sm border border-accent/10">
                <Icon icon="bi:envelope-at-fill" width={20} height={20} className="text-accent" />
                <a href="mailto:adigic@hotmail.com" className="text-brand/90 hover:text-accent transition-colors text-sm font-semibold break-all">adigic@hotmail.com</a>
              </div>
              <div className="flex items-center gap-3 bg-white/60 rounded px-3 py-2 shadow-sm border border-accent/10">
                <Icon icon="solar:phone-bold" width={20} height={20} className="text-accent" />
                <a href="tel:+46700788788" className="text-brand/90 hover:text-accent transition-colors text-sm font-semibold">+46 700 788 788</a>
              </div>
              {/* Download CV button with document icon */}
              <button
                type="button"
                onClick={() => {
                  if (typeof window === "undefined") return;
                  const cvUrl = "/Adis Hegic CV & Projects.pdf";
                  window.open(cvUrl, "_blank", "noopener,noreferrer");
                }}
                className="flex items-center gap-3 bg-white/60 rounded px-3 py-2 shadow-sm border border-accent/10 text-brand/90 hover:text-accent transition-colors text-sm font-semibold mt-1 cursor-pointer"
                aria-label="Download my CV here!"
              >
                <Icon icon="ph:file-pdf-bold" width={20} height={20} className="text-accent" />
                <span>Download CV</span>
              </button>
            </div>
            <div className="mt-8 text-xs text-brand/40 font-jura">Usually replies within 24h</div>

          </div>
        </div>
      </div>
    </div>
  );
}
