"use client"; // Error _modules must be Client Components

import { DefaultPageLayout } from "@/components/pageLayout/defaultPageLayout";
import { Button } from "@/components/ui/button";
import { type ReactNode, useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): ReactNode {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <DefaultPageLayout>
      <div>
        <h2>Something went wrong!</h2>
        <Button
          type={"button"}
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => {
              reset();
            }
          }
        >
          Try again
        </Button>
      </div>
    </DefaultPageLayout>
  );
}
