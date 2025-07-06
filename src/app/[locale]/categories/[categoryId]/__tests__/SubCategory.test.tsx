import Wrapper from "@/testMockUps/intlMoskUpProvider";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { SubCategoryItem } from "@/modules/subCategory/components/SubCategoryList/SubCategoryItem";

describe("SubCategory component", () => {
  it("should have text", async () => {
    render(<SubCategoryItem item={null} />, {
      wrapper: Wrapper,
    }); //ARRANGE

    const elem = screen.queryByText("test"); //ACT

    expect(elem).not.toBeInTheDocument(); //ASSERT
  });
});
