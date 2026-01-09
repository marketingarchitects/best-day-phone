import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "@/app/styles/globals.scss";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Best Day Phone",
  description: "Every day deserves to be your best.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfairDisplay.variable} ${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}
