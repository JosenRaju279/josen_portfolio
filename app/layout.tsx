import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Josen | Interactive Portfolio Experience",
  description:
    "A design-led portfolio experience built with Next.js, React Three Fiber, and cinematic UI motion.",
  keywords: [
    "portfolio",
    "interactive portfolio",
    "creative developer",
    "full-stack developer",
    "Next.js",
    "React Three Fiber",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
