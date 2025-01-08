"use client";
import { ReactNode } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
import { useIntl } from "react-intl";
import { List } from "@/components/bradcrumbs/list";
import { LinkWithLocale } from "@/components/linkWithLocale/LinkWithLocale";
export type TBradcrmb = {
  name: string;
  url: string | number;
}[];

export const Bradcrmbs = ({
  bradcrumbs,
}: {
  bradcrumbs?: TBradcrmb | null;
}): ReactNode => {
  const { locale } = useIntl();
  if (!bradcrumbs) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <LinkWithLocale href={`/`}>Home</LinkWithLocale>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <List list={bradcrumbs} locale={locale} />
      </BreadcrumbList>
    </Breadcrumb>
  );
};
