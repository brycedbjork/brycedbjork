import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist_Mono, STIX_Two_Text } from "next/font/google";
import "./globals.css";

const stixTwoText = STIX_Two_Text({
  variable: "--font-stix-two-text",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://brycedbjork.com"),
  title: "Bryce Bjork",
  description:
    "I'm an entrepreneur, developer, and designer. I've actively coded since I was 10, started my first company at 15, and studied Economics at Yale.",
  icons: {
    icon: "/bryce.jpg",
    apple: "/bryce.jpg",
  },
  openGraph: {
    title: "Bryce Bjork",
    description:
      "I'm an entrepreneur, developer, and designer. I've actively coded since I was 10, started my first company at 15, and studied Economics at Yale.",
    images: ["/bryce.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bryce Bjork",
    description:
      "I'm an entrepreneur, developer, and designer. I've actively coded since I was 10, started my first company at 15, and studied Economics at Yale.",
    images: ["/bryce.jpg"],
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
        className={`${stixTwoText.variable} ${geistMono.variable} ${stixTwoText.className} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
