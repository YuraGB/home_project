import { render } from "@testing-library/react";
import Wrapper from "@/testMockUps/intlMoskUpProvider";
import { screen } from "@testing-library/dom";
import { AddSubCategoryButton } from "@/app/[locale]/[categoryId]/_modules/components/AddSubCategory/AddSubCategoryButton";

describe("AddSubCategoryButton component", () => {
  it("should have text", async () => {
    render(<AddSubCategoryButton userId={1} parentId={1} />, {
      wrapper: Wrapper,
    }); //ARRANGE

    const elem = screen.getByRole("button", {
      name: "Create new sub category",
    }); //ACT

    expect(elem).toBeInTheDocument(); //ASSERT
  });
});
