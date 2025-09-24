import {
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
import { TBradcrmb } from "@/components/bradcrumbs/Bradcrmbs";
import { Fragment, ReactNode } from "react";
import Link from "next/link";

export const List = ({
  list,
}: {
  list: TBradcrmb;
  locale: string;
}): ReactNode => {
  return list.map((b, i, array) => {
    if (i + 1 !== array.length) {
      return (
        <Fragment key={b.name}>
          <BreadcrumbItem>
            <Link
              href={`/${b.url}`}
              className="text-textBrdcrumbs"
              prefetch={true}
            >
              {b.name}
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash className="text-textBrdcrumbs" />
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
