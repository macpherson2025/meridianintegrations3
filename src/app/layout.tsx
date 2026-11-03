import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "We design high-performance websites, help businesses get found on Google and AI-powered search, and build marketing and automation solutions that generate leads and support growth.";

export const metadata: Metadata = {
  metadataBase: new URL("https://meridianintegrations.com"),
  title: {
    default: "Meridian Integrations | Websites, Search, and Marketing",
    template: "%s | Meridian Integrations",
  },
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Meridian Integrations | Websites, Search, and Marketing",
    description,
    url: "/",
    siteName: "Meridian Integrations",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-svh flex-col bg-brandDark font-sans text-white">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-brandRed focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
