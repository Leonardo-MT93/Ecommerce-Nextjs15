import { Geist, Montserrat_Alternates } from "next/font/google";


export const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
  });


export const titleFont = Montserrat_Alternates({
    variable: "--font-montserrat-alternates",
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  });


