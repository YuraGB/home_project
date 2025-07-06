"server-only";

import { createIntl } from "@formatjs/intl";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default async function getIntl(locale = "en-US") {
  let messages;

  if (locale === "en-US") {
    messages = (await import(`@/i18n/en.json`)).default;
  }

  if (locale === "uk-UA") {
    messages = (await import(`@/i18n/uk.json`)).default;
  }

  return createIntl({
    locale,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    messages,
    onError: (e) => {
      console.log(e);
    },
  });
}
