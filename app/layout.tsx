import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Josen Raju | Software Engineer",
  description:
    "Portfolio of Josen Raju — Software Engineer building scalable systems and crafting digital experiences. Explore my projects, skills, and professional journey.",
  keywords: [
    "Josen Raju",
    "software engineer",
    "full stack developer",
    "portfolio",
    "web developer",
    "React",
    "Next.js",
    "TypeScript",
  ],
  openGraph: {
    title: "Josen Raju | Software Engineer",
    description: "Building Scalable Systems & Crafting Digital Experiences",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
