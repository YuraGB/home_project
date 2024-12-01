export const Header = () => {
  return (
    <header
      className={
        "grid grid-cols-[1fr_minmax(900px,_1fr)_1fr] items-center border-b-2 p-2 mb-2"
      }
    >
      <section className={"col-start-2 grid grid-cols-3 justify-items-center"}>
        <p>leftSide</p>
        <p>Logo</p>
        <p>user</p>
      </section>
    </header>
  );
};
