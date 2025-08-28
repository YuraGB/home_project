import type { Metadata } from "next";
import "../globals.css";
import AuthProvider from "@/context/AuthProvider";
import ServerIntlProvider from "@/context/i18nProvider";
import getIntl from "@/server/lib/intl";
import { FetchProvider } from "@/context/FetchProvider";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/header/Header";
import { Background } from "@/components/background";
import { ProviderTheme } from "@/context/ThemeProvider";
import { baseUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Favly",
  description:
    "A SaaS platform for saving your favorite titles, rating them, and organizing content by genres.",
  appleWebApp: {
    title: "Favly",
    statusBarStyle: "black-translucent",
  },
  abstract: "Create, Rate and Classify Titles Online | Free Web App",
  keywords: ["titles", "rate", "classify", "web app"],
  authors: [{ name: "Yurii Hurianov" }],
  creator: "Yurii Hurianov",
  publisher: "Yurii Hurianov",
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: "Create, Rate and Classify Titles Online | Free Web App",
    description:
      "A SaaS platform for saving your favorite titles, rating them, and organizing content by genres.",
    url: baseUrl,
    siteName: "Favly",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Create, Rate and Classify Titles Online | Free Web App",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  category: "leisure",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale?: string }>;
}>) {
  const { locale } = await params;
  const safeLocale = ["en-US", "uk-UA"].includes(locale ?? "")
    ? locale!
    : "en-US";
  const intl = await getIntl(safeLocale);

  return (
    <ServerIntlProvider messages={intl.messages} locale={intl.locale}>
      <FetchProvider>
        <AuthProvider>
          <ProviderTheme>
            <Header />
            {children}
            <Background />
            <Toaster />
          </ProviderTheme>
        </AuthProvider>
      </FetchProvider>
    </ServerIntlProvider>
  );
}

export function generateStaticParams(): Array<{ locale: string }> {
  const locales = ["en-US", "uk-UA"];

  return locales.map((locale) => ({ locale }));
}
