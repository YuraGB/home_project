import { ReactNode } from "react";
import { useIntl } from "react-intl";
import Link, { LinkProps } from "next/link";
import { AnchorHTMLAttributes } from "react";

type TLink = {
  href: string;
  children: ReactNode;
};

// Omit referrerPolicy from the rest props to avoid passing it to Link
export const LinkWithLocale = ({
  href,
  children,
  ...rest
}: TLink &
  LinkProps &
  Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "referrerPolicy"
  >): ReactNode => {
  const { locale = "en-US" } = useIntl();

  return (
    <Link href={`/${locale}/${href}`} {...rest}>
      {children}
    </Link>
  );
};
