import {
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
import { TBradcrmb } from "@/components/bradcrumbs/Bradcrmbs";
import { Fragment, ReactNode } from "react";
import { LinkWithLocale } from "@/components/linkWithLocale/LinkWithLocale";

export const List = ({
  list,
  locale = "en-US",
}: {
  list: TBradcrmb;
  locale: string;
}): ReactNode => {
  return list.map((b, i, array) => {
    if (i + 1 !== array.length) {
      return (
        <Fragment key={b.name}>
          <BreadcrumbItem>
            <LinkWithLocale href={`/${locale}/${b.url}`}>
              {b.name}
            </LinkWithLocale>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
        </Fragment>
      );
    }

    return (
      <Fragment key={b.name}>
        <BreadcrumbItem>
          <BreadcrumbPage>{b.name}</BreadcrumbPage>
        </BreadcrumbItem>
      </Fragment>
    );
  });
};
