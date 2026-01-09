import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Header from '@/components/marketing/Header/Header';
import "@/app/styles/globals.scss";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
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
      <body className={`${playfairDisplay.variable} ${inter.variable}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
