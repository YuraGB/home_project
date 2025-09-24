import Link from "next/link";
import { DefaultPageLayout } from "@/components/pageLayout/defaultPageLayout";

export default function NotFound() {
  return (
    <DefaultPageLayout>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/" prefetch={true}>
        Return Home!
      </Link>
    </DefaultPageLayout>
  );
}
