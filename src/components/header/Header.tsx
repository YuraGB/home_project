import { ModeToggle } from "@/components/theme/themeSwitcher";
import { Profile } from "@/components/user/Profile";
import { Logo } from "@/components/header/Logo";

export const Header = () => {
  return (
    <header
      className={
        "grid grid-cols-[1fr_minmax(320px,_900px)_1fr] items-center border-b-2 p-2 mb-2 w-full top-0 backdrop-blur left-0"
      }
    >
      <section
        className={"col-start-2 grid grid-cols-2 justify-items-center w-full"}
      >
        <Logo />
        <section className={"flex items-center gap-4"}>
          <ModeToggle />
          <Profile />
        </section>
      </section>
    </header>
  );
};
