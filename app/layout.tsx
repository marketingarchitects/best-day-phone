import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
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
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} ${playfairDisplay.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
