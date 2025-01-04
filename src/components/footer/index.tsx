import { ReactNode } from "react";

export const Footer = ({ children }: { children: ReactNode }): ReactNode => {
  return <footer className={"py-4"}>{children}</footer>;
};
