import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { Providers } from "./Providers";

const SITE_URL = "https://saimjs.com";
const TITLE = "Saim Kaskar | Junior Full-Stack Developer in Dublin";
const DESCRIPTION =
  "Junior full-stack developer in Dublin. I ship React and Node apps, use LangChain in production, and I am learning LangGraph. MSc Computing, Griffith College. Open to work.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Saim Kaskar",
  },
  description: DESCRIPTION,
  applicationName: "Saim Kaskar",
  authors: [{ name: "Saim Kaskar", url: SITE_URL }],
  creator: "Saim Kaskar",
  publisher: "Saim Kaskar",
  keywords: [
    "Saim Kaskar",
    "junior full-stack developer Dublin",
    "React developer Ireland",
    "Node.js developer Dublin",
    "LangChain",
    "LangGraph",
    "OpenAI",
    "agentic AI",
    "Next.js",
    "Griffith College Dublin",
    "open to work",
  ],
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: SITE_URL,
    siteName: "Saim Kaskar",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  category: "technology",
};

export const viewport = {
  themeColor: "#141414",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Saim Kaskar",
      description: DESCRIPTION,
      inLanguage: "en-IE",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Saim Kaskar",
      url: SITE_URL,
      image: `${SITE_URL}/me.webp`,
      email: "mailto:saimkaskar1@gmail.com",
      jobTitle: "Junior Full-Stack Developer",
      description: DESCRIPTION,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dublin",
        addressCountry: "IE",
      },
      sameAs: [
        "https://www.linkedin.com/in/saim-kaskar-34a6a4206/",
        "https://github.com/itsmesaim",
      ],
      alumniOf: [
        {
          "@type": "CollegeOrUniversity",
          name: "Griffith College Dublin",
        },
        {
          "@type": "CollegeOrUniversity",
          name: "AIKTC (Mumbai University)",
        },
      ],
      knowsAbout: [
        "React",
        "JavaScript",
        "Node.js",
        "FastAPI",
        "LangChain",
        "LangGraph",
        "OpenAI",
        "NLP",
        "MongoDB",
      ],
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      url: SITE_URL,
      name: TITLE,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#person` },
      mainEntity: { "@id": `${SITE_URL}/#person` },
      inLanguage: "en-IE",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IE" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AppRouterCacheProvider>
          <Providers>{children}</Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
