import { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/query-core";

const queryClient = new QueryClient();
const QueryWrapper = ({ children }: { children: ReactNode }): ReactNode => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export default QueryWrapper;
