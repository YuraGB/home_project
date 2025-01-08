import { SubCategoryItem } from "@/app/[locale]/[categoryId]/_modules/components/SubCategoryList/SubCategoryItem";
import Wrapper from "@/testMockUps/intlMoskUpProvider";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";

describe("SubCategory component", () => {
  it("should have text", async () => {
    render(<SubCategoryItem item={null} />, {
      wrapper: Wrapper,
    }); //ARRANGE

    const elem = screen.queryByText("test"); //ACT

    expect(elem).not.toBeInTheDocument(); //ASSERT
  });
});
