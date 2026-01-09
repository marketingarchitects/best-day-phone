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

const SITE_TITLE = "Best Day Phone — A Companion That's Always There";
const SITE_DESCRIPTION =
  "A companion that calls your loved one daily with a kind, patient voice — so they're never alone, and you can finally breathe.";
const SITE_DESCRIPTION_FULL = `${SITE_DESCRIPTION} Designed for families caring for someone with Alzheimer's or dementia.`;

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION_FULL,
  keywords: [
    "Alzheimer's care",
    "dementia companion",
    "senior care",
    "caregiver support",
    "elderly companion",
  ],
  authors: [{ name: "Best Day Phone" }],
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
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
