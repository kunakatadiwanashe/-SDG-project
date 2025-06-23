import type { Metadata } from "next";
import "./globals.css";
import { Inter, Roboto } from "next/font/google";
import Navbar from "@/components/navbar";
import { SessionProvider } from "next-auth/react";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto"
});

export const metadata: Metadata = {
  title: "Cared For",
  description: "One stop solution for all your healthcare needs",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html  lang="en" className={`${roboto.variable} font-sans`}>
      <head><link rel="icon" href="/icon.png" type="image/png" className="object-contain"/></head>
      <body suppressHydrationWarning={true}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
