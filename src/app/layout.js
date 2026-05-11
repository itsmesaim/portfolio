import "./globals.css";
import { Providers } from "./Providers";
import { Navbar } from "@/components/layout/Navbar";
import { StatusBar } from "@/components/layout/StatusBar";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { ScrollProgress } from "@/components/shared/ScrollProgress";

export const metadata = {
  title: "Saim Kaskar — Engineer · Builder",
  description:
    "Building real-time, AI-shaped products from Dublin. React · Spring Boot · LangChain · WebRTC.",
  keywords: [
    "full-stack developer",
    "react",
    "dublin",
    "langchain",
    "webrtc",
    "ai engineer",
    "saim kaskar",
  ],
  openGraph: {
    title: "Saim Kaskar — Engineer · Builder",
    description: "Building real-time, AI-shaped products from Dublin.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ScrollProgress />
          <StatusBar />
          <Navbar />
          <CustomCursor />
          {children}
        </Providers>
      </body>
    </html>
  );
}
