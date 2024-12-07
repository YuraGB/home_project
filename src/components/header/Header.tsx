import { ModeToggle } from "@/components/theme/themeSwitcher";

export const Header = () => {
  return (
    <header
      className={
        "grid grid-cols-[1fr_minmax(900px,_1fr)_1fr] items-center border-b-2 p-2 mb-2 absolute w-full top-0 backdrop-blur left-0"
      }
    >
      <section className={"col-start-2 grid grid-cols-3 justify-items-center"}>
        <ModeToggle />
        <p>Logo</p>
        <p>user</p>
      </section>
    </header>
  );
};
