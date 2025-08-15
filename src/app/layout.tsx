import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { geistSans } from "@/config/fonts";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s - Teslo | Shop",
    default: 'Home - Teslo | Shop'
  },
  description: "A webshop for Teslo developed by @Leonify",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
