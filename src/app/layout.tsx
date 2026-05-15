import localFont from "next/font/local";
import "./globals.css";
import AnalyticsLoader from "./components/AnalyticsLoader";
import CookieBanner from "./components/CookieBanner";
import { ModalProvider } from "./components/ModalContext";
import ContactModalWrapper from "./components/ContactModalWrapper";


// define fonts
const poppins = localFont({
  src: [
    { path: "../../public/fonts/Poppins-Light.ttf", weight: "300", style: "normal" },
    { path: "../../public/fonts/Poppins-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/Poppins-Medium.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/Poppins-SemiBold.ttf", weight: "600", style: "normal" },
  ],
  variable: "--font-poppins",
});

const alexandria = localFont({
  src: [
    { path: "../../public/fonts/Alexandria-VariableFont_wght.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/Alexandria-VariableFont_wght.ttf", weight: "300", style: "normal" }
  ],
  variable: "--font-alexandria",
});

const righteous = localFont({
  src: [{ path: "../../public/fonts/Righteous-Regular.ttf", weight: "400", style: "normal" }],
  variable: "--font-righteous",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
<html
  lang="sv"
  className="scroll-smooth scroll-pt-4 md:scroll-pt-20"
>
      <body
  className={`
    ${poppins.variable}
    ${alexandria.variable}
    ${righteous.variable}
    antialiased
    font-sans
    bg-brand text-white
    
  `}
      >
                {/* 🔹 Ladda GA enbart när samtycke finns */}
        <AnalyticsLoader />
        <ModalProvider>
          <ContactModalWrapper />
          <div className="relative min-h-svh">
              <NetlifyDetectionForm />
              {children}
          </div>
        </ModalProvider>
        {/* 🔹 Cookie-banner längst ner */}
        <CookieBanner />
      </body>
    </html>
  );
}

// Netlify Forms detection: hidden static form
function NetlifyDetectionForm() {
  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      hidden
      style={{ display: "none" }}
    >
      <input type="hidden" name="form-name" value="contact" />
      <p style={{ display: "none" }}>
        <label>
          Don’t fill this out if you&apos;re human: <input name="bot-field" />
        </label>
      </p>
      <input name="name" type="text" />
      <input name="email" type="email" />
      <textarea name="message" />
      <button type="submit">Send</button>
    </form>
  );
}
