import "./globals.css";
import { Providers } from "./Providers";

export const metadata = {
  title: "Saim Kaskar — Full-Stack Engineer & AI Developer | Dublin",
  description:
    "Full-stack engineer based in Dublin. Building real-time systems with React, Spring Boot, WebRTC and AI-powered products with LangChain. MSc Computing, Griffith College Dublin. Open to work.",
  keywords: [
    "Saim Kaskar",
    "full-stack developer Dublin",
    "React developer Ireland",
    "LangChain developer",
    "WebRTC engineer",
    "AI engineer Dublin",
    "Next.js developer",
    "Spring Boot",
    "saimjs.com",
  ],
  authors: [{ name: "Saim Kaskar", url: "https://saimjs.com" }],
  creator: "Saim Kaskar",
  openGraph: {
    title: "Saim Kaskar — Full-Stack Engineer & AI Developer",
    description:
      "Building real-time, AI-powered products from Dublin. React · Spring Boot · LangChain · WebRTC.",
    url: "https://saimjs.com",
    siteName: "Saim Kaskar Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saim Kaskar — Full-Stack Engineer & AI Developer",
    description:
      "Building real-time, AI-powered products from Dublin. React · Spring Boot · LangChain · WebRTC.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://saimjs.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
