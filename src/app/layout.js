import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { Providers } from "./Providers";

export const metadata = {
  metadataBase: new URL("https://saimjs.com"),
  title: "Saim Kaskar : Full-Stack Engineer & AI Developer | Dublin",
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
    title: "Saim Kaskar : Full-Stack Engineer & AI Developer",
    description:
      "Building real-time, AI-powered products from Dublin. React · Spring Boot · LangChain · WebRTC.",
    url: "https://saimjs.com",
    siteName: "Saim Kaskar Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saim Kaskar : Full-Stack Engineer & AI Developer",
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

export const viewport = {
  themeColor: "#141414",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Saim Kaskar",
  jobTitle: "Full-Stack AI Engineer",
  url: "https://saimjs.com",
  image: "https://saimjs.com/me.jpg",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dublin",
    addressCountry: "IE",
  },
  sameAs: [
    "https://www.linkedin.com/in/saim-kaskar-34a6a4206/",
    "https://github.com/itsmesaim",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Griffith College Dublin",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <AppRouterCacheProvider>
          <Providers>{children}</Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
