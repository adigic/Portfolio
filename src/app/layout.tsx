import localFont from "next/font/local";
import "./globals.css";


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
  className="scroll-smooth snap-y snap-mandatory h-screen overflow-y-scroll "
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
        {children}
      </body>
    </html>
  );
}
