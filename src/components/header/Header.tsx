import dynamic from "next/dynamic";

const ModeToggle = dynamic(() =>
  import("@/components/theme/themeSwitcher").then((mod) => mod.ModeToggle),
);
const Profile = dynamic(() =>
  import("@/components/user/Profile").then((mod) => mod.Profile),
);
import { Logo } from "@/components/header/Logo";
import { Suspense } from "react";
import { HeaderWrapper } from "@/components/header/HeaderWrapper";

export const Header = () => {
  return (
    <HeaderWrapper>
      <Logo />
      <section className={"flex items-center gap-4"}>
        <Suspense fallback={null}>
          <ModeToggle />
          <Profile />
        </Suspense>
      </section>
    </HeaderWrapper>
  );
};
