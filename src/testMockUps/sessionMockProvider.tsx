import React from "react";
import { SessionProvider } from "next-auth/react";

export default function AuthMockProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return (
    <SessionProvider refetchInterval={5 * 60} refetchOnWindowFocus={false}>
      {children}
    </SessionProvider>
  );
}
