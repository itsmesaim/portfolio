import "./globals.css";
import { Providers } from "./Providers";

export const metadata = {
  title: "Saim Kaskar — Engineer · Builder",
  description:
    "Building real-time, AI-shaped products from Dublin. React · Spring Boot · LangChain · WebRTC.",
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
