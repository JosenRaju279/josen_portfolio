import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Josen Raju | Software Engineer",
  description:
    "Portfolio of Josen Raju, a software engineer building reliable web, mobile, and Android experiences with Java, React, React Native, and JavaScript.",
  keywords: [
    "Josen Raju",
    "software engineer",
    "full stack developer",
    "portfolio",
    "frontend developer",
    "mobile developer",
    "React",
    "React Native",
    "Java",
  ],
  openGraph: {
    title: "Josen Raju | Software Engineer",
    description:
      "Software Engineer building reliable Web, Mobile, and Android experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
