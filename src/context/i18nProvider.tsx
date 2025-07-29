"use client";

import { IntlProvider } from "react-intl";
import * as React from "react";
import { type MessageFormatElement } from "@formatjs/icu-messageformat-parser";

export default function ServerIntlProvider({
  children,
  messages,
  locale = "en-US",
}: {
  children: React.ReactNode;
  messages:
    | Record<string, string>
    | Record<string, MessageFormatElement[]>
    | undefined;
  locale: string;
}) {
  return (
    <IntlProvider messages={messages} locale={locale}>
      {children}
    </IntlProvider>
  );
}
