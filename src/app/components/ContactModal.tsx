"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

import { useContext, useEffect } from "react";
import { ModalContext } from "./ModalContext";

export default function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {

      // Stäng modal vid klick på overlay
      function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
        if (e.target === e.currentTarget) {
          onClose();
          if (modalCtx && modalCtx.setOpen) modalCtx.setOpen(false);
        }
      }
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



  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          message: fd.get("message"),
        }),
      });
      if (!res.ok) throw new Error("Contact submission failed");
      form.reset();
      setSent(true);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={handleOverlayClick}>
      <div className="bg-white rounded-sm shadow-2xl w-full max-w-3xl relative animate-fadeInDown flex flex-col md:flex-row p-0 md:p-0 overflow-hidden mx-8" onClick={e => e.stopPropagation()}>
        <button
          onClick={() => {
            // Återställ formulär och bekräftelse när modalen stängs
            setSent(false);
            if (formRef.current) formRef.current.reset();
            onClose();
            if (modalCtx && modalCtx.setOpen) modalCtx.setOpen(false);
          }}
          className="absolute top-3 right-3 text-brand/60 hover:text-accent text-xl z-10 cursor-pointer"
          aria-label="Close"
        >
          <Icon icon="mdi:close" width={24} height={24} />
        </button>
        {/* Form eller bekräftelse */}
        <div className="w-full md:w-[60%] p-6 md:p-8 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col items-center justify-center min-h-[300px]"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.1 }}
                  className="mb-4"
                >
                  <Icon icon="mdi:check-circle" width={64} height={64} className="text-green-500" />
                </motion.span>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="text-2xl font-bold text-brand mb-2"
                >
                  Message sent!
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="text-brand/70 text-center"
                >
                  Thank you for reaching out. I will get back to you soon.
                </motion.p>
              </motion.div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-brand mb-4">Contact Me</h3>
                <form
                  ref={formRef}
                  name="contact"
                  onSubmit={handleSubmit}
                  autoComplete="off"
                  className="space-y-4"
                >
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
                    {submitting ? "Sending..." : "Send"}
                  </button>
                </form>
              </>
            )}
          </AnimatePresence>
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
