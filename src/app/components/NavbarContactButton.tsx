"use client";
import ContactButton from "./ContactButton";
import { useModal } from "./ModalContext";

export default function NavbarContactButton({ className = "", textColorClass, onClick }: { className?: string; textColorClass?: string; onClick?: () => void }) {
  const { setOpen } = useModal();
  return <ContactButton className={className} textColorClass={textColorClass} onClick={() => {
    if (onClick) onClick();
    setOpen(true);
  }} />;
}
