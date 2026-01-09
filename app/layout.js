import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import LocaleWrapper from "./LocaleWrapper";
import { AntdProvider } from "./AntdProvider";

export const metadata = {
  title: "Alisson Rodrigues CV",
  description:
    "Un proyecto base completo y listo para usar con Next.js 15, Tailwind CSS 4 y autenticación",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <AntdProvider>
          <LanguageProvider>
            <LocaleWrapper>{children}</LocaleWrapper>
          </LanguageProvider>
        </AntdProvider>
      </body>
    </html>
  );
}
