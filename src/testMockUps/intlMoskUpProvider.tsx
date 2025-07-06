import { createIntl } from "@formatjs/intl";
import en from "@/i18n/en.json";
import ServerIntlProvider from "@/context/i18nProvider";
import { ReactNode } from "react";

const intl = createIntl({
  locale: "en-US",
  messages: en,
  onError: (e) => {
    console.log(e);
  },
});
function Wrapper({ children }: { children: ReactNode }): ReactNode {
  return (
    <ServerIntlProvider locale={intl.locale} messages={intl.messages}>
      {children}
    </ServerIntlProvider>
  );
}

export default Wrapper;
