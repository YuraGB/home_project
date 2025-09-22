export const SubCategoryListSkeleton = () => {
  return (
    <section
      className={"border-b relative max-w-full py-4 sub-category-slider"}
    >
      <div role="status" className="w-full animate-pulse flex max-w-full">
        <p className="h-[50px] w-[300px] bg-[#243137] rounded-[10px] ml-[20px]"></p>

        <p className="h-[50px] w-[300px] bg-[#243137] rounded-[10px] ml-[20px]"></p>

        <p className="h-[50px] w-[300px] bg-[#243137] rounded-[10px] ml-[20px]"></p>

        <p className="h-[50px] w-[300px] bg-[#243137] rounded-[10px] ml-[20px]"></p>
      </div>
    </section>
  );
};
