import { render, waitFor } from "@testing-library/react";
import { AddCategoryBtn } from "@/modules/category/components/AddCategoryBtn";
import Wrapper from "@/testMockUps/intlMoskUpProvider";
import { screen } from "@testing-library/dom";

describe("AddCategoryBtn component", () => {
  it("should have text", async () => {
    render(<AddCategoryBtn userId={1} />, {
      wrapper: Wrapper,
    }); //ARRANGE

    const elem = screen.getByText("Create new category"); //ACT

    await waitFor(
      () => expect(elem).toBeInTheDocument(), //ASSERT
    );
  });

  it("should not to be in the DOM", () => {
    render(<AddCategoryBtn userId={null} />, {
      wrapper: Wrapper,
    }); //ARRANGE

    const elem = screen.queryByText("Create new category"); //ACT

    expect(elem).toBeNull(); //ASSERT
  });
});
