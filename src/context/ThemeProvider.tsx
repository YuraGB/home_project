import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

export const ProviderTheme = ({
  children,
}: {
  children: ReactNode;
}): ReactNode => (
  <ThemeProvider
    attribute={"class"}
    defaultTheme={"theme"}
    enableSystem
    disableTransitionOnChange
  >
    {children}
  </ThemeProvider>
);
