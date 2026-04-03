"use client";
import ContactModal from "./ContactModal";
import { useModal } from "./ModalContext";
import { useEffect } from "react";

export function ContactModalClient() {
  const { open, setOpen } = useModal();

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("openContactModal", handler);
    return () => window.removeEventListener("openContactModal", handler);
  }, [setOpen]);

  return <ContactModal open={open} onClose={() => setOpen(false)} />;
}
