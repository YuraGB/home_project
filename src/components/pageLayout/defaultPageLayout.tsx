import { ReactNode } from "react";

export const DefaultPageLayout = ({
  children,
}: {
  children: ReactNode;
}): ReactNode => {
  return (
    <div className="grid py-10 px-8 sm:p-10 font-[family-name:var(--font-geist-sans)] md:px-8 md:py-10">
      <main className="flex flex-col h-full items-center sm:items-start w-full max-w-7xl m-auto overflow-hidden">
        {children}
      </main>
    </div>
  );
};
