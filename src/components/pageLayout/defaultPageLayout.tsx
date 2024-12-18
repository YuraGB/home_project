import { ReactNode } from "react";

export const DefaultPageLayout = ({
  children,
}: {
  children: ReactNode;
}): ReactNode => {
  return (
    <>
      <div className="grid  min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col h-full items-center sm:items-start w-full max-w-7xl m-auto">
          {children}
        </main>
      </div>
    </>
  );
};
