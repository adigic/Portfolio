"use client";
import ContactModal from "./ContactModal";
import { useModal } from "./ModalContext";

export function ContactModalClient() {
  const { open, setOpen } = useModal();
  return <ContactModal open={open} onClose={() => setOpen(false)} />;
}
