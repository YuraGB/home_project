"use client";
import { ReactNode, useState } from "react";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";

export const FetchProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactNode => {
  const [queryClient] = useState(new QueryClient({}));

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
