import { AddPostButton } from "@/app/[locale]/[categoryId]/_modules/components/AddPost/AddPostButton";
import Wrapper from "@/testMockUps/intlMoskUpProvider";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";

describe("AddPostButton component", () => {
  it("should have text", () => {
    render(<AddPostButton userId={1} categoryId={1} />, {
      wrapper: Wrapper,
    }); //ARRANGE

    const elem = screen.getByRole("button", {
      name: "Create new post",
    }); //ACT

    expect(elem).toBeInTheDocument(); //ASSERT
  });
});
