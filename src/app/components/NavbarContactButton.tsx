"use client";
import ContactButton from "./ContactButton";
import { useModal } from "./ModalContext";

export default function NavbarContactButton({ className = "", textColorClass }: { className?: string; textColorClass?: string }) {
  const { setOpen } = useModal();
  return <ContactButton className={className} textColorClass={textColorClass} onClick={() => setOpen(true)} />;
}
