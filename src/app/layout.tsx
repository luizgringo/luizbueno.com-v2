import { ShellFrame } from "@/features/shell/components/shell-frame.client";
import { rootMetadata, rootStructuredDataJsonLd } from "@/shared/seo/metadata";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import type { ReactNode } from "react";
import "./globals.css";

const UMAMI_SCRIPT_SRC = "https://cloud.umami.is/script.js";
const UMAMI_WEBSITE_ID = "61086f1d-e3b1-4422-99fa-f7c5bcdaff00";

/**
 * Classic Console Neue — authentic 8x16 ASCII console fixed-width font.
 *
 * @remarks
 * Self-hosted via {@link https://webdraft.hu/fonts/classic-console/} (MIT).
 * Used as the single typography source for the whole DOS-themed UI.
 */
const fontClacon = localFont({
  src: [
    {
      path: "../../public/fonts/clacon2.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/clacon2.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-clacon",
  display: "swap",
});

/**
 * Global metadata shared by the whole application.
 */
export const metadata: Metadata = rootMetadata;

/**
 * Global viewport customization.
 */
export const viewport: Viewport = {
  themeColor: "#0000AA",
};

/**
 * Props accepted by the root layout.
 */
type RootLayoutProps = {
  children: ReactNode;
};

/**
 * Root App Router layout.
 *
 * @param props - Layout children rendered inside the shell frame.
 * @returns The complete HTML layout with the console font, shell and structured data.
 */
export default function RootLayout({ children }: RootLayoutProps) {
  const structuredData = rootStructuredDataJsonLd();

  return (
    <html lang="en-US" className={fontClacon.variable}>
      <body>
        <ShellFrame>{children}</ShellFrame>
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <Script
          defer
          src={UMAMI_SCRIPT_SRC}
          data-website-id={UMAMI_WEBSITE_ID}
          strategy="afterInteractive"
        />
        <Analytics />
      </body>
    </html>
  );
}
