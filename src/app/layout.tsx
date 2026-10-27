import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Providers } from "@/components/layout/providers";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { site } from "@/content/site";

// decision: Geist (sans) + Geist Mono, one family each, variable weight. This
// departs from MC's Roboto + Crimson Text pairing on purpose: the clean,
// single-family look the references share is not achievable with that pair.
// To revert, swap the imports here and the --font-* lines in globals.css.
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.college}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.fullName,
  keywords: [
    "Montgomery College",
    "Rockville",
    "SGA",
    "Student Government",
    "student clubs",
    "funding",
  ],
  openGraph: {
    type: "website",
    siteName: site.fullName,
    title: `${site.name} · ${site.college}`,
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@mcsgarv",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#51237F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-pill focus:bg-mc-purple focus:px-4 focus:py-2 focus:text-white"
          >
            Skip to content
          </a>
          <SiteHeader />
          <div className="site-frame flex flex-1 flex-col">
            <main id="main" className="flex-1">
              {children}
            </main>
            <SiteFooter />
          </div>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
