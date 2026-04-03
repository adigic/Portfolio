"use client";
import dynamic from "next/dynamic";
const ContactModalClient = dynamic(() => import("./ContactModalClient").then(mod => mod.ContactModalClient), { ssr: false });
export default function ContactModalWrapper() {
  return <ContactModalClient />;
}
