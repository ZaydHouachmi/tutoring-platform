import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Math Tutoring in Ottawa | Mozayd Houachmi",
  description:
    "One on one math tutoring in Ottawa, online or in person, in English, French or Arabic.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  /*
   * A root layout wraps every locale, so this attribute can only carry a
   * default. The real per-locale language is set on the wrapper in
   * app/[lang]/layout.tsx, which assistive tech honours for everything inside
   * it. Reading the path here instead would opt the whole site out of static
   * rendering for the sake of one attribute.
   */
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
