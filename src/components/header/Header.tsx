import { ModeToggle } from "@/components/theme/themeSwitcher";
import { Profile } from "@/components/user/Profile";

export const Header = () => {
  return (
    <header
      className={
        "grid grid-cols-[1fr_minmax(320px,_900px)_1fr] items-center border-b-2 p-2 mb-2 absolute w-full top-0 backdrop-blur left-0"
      }
    >
      <section
        className={"col-start-2 grid grid-cols-3 justify-items-center w-full"}
      >
        <ModeToggle />
        <p>Logo</p>
        <Profile />
      </section>
    </header>
  );
};
