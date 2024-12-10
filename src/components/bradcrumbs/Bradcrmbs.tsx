"use client";
import { ReactNode } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
import { useIntl } from "react-intl";
import { List } from "@/components/bradcrumbs/list";
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
          <BreadcrumbLink href={`/${locale}/`}>Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <List list={bradcrumbs} locale={locale} />
      </BreadcrumbList>
    </Breadcrumb>
  );
};
