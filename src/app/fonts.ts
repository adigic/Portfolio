// app/fonts.ts
import localFont from "next/font/local";

export const Poppins = localFont({
  src: [
    { path: "./../../public/fonts/Poppins-Light.ttf", weight: "300", style: "normal" },
    { path: "./../../public/fonts/Poppins-Regular.ttf", weight: "400", style: "normal" },
    { path: "./../../public/fonts/Poppins-Medium.ttf", weight: "500", style: "normal" },
    { path: "./../../public/fonts/Poppins-SemiBold.ttf", weight: "600", style: "normal" },
  ],
  variable: "--font-poppins",
});

export const Alexandria = localFont({
  src: [
    {
      path: "./../../public/fonts/Alexandria-VariableFont_wght.ttf",
      weight: "400",
      style: "normal",
    },
  ],
    variable: "--font-alexandria",
});

export const Righteous = localFont({
  src: [
    {
      path: "./../../public/fonts/Righteous-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-righteous",
});
