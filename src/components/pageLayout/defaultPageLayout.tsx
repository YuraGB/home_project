import { ReactNode } from "react";

export const DefaultPageLayout = ({
  children,
}: {
  children: ReactNode;
}): ReactNode => {
  return (
    <div className="grid  min-h-screen py-20 px-8 sm:p-20 font-[family-name:var(--font-geist-sans)] md:px-8 md:py-20">
      <main className="flex flex-col h-full items-center sm:items-start w-full max-w-7xl m-auto overflow-hidden">
        {children}
      </main>
    </div>
  );
};
