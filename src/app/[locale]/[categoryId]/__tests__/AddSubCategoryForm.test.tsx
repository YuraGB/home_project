import { ReactNode } from "react";
import IntlWrapper from "@/testMockUps/intlMoskUpProvider";
import QueryWrapper from "@/testMockUps/queryMockUpProvider";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { AddSubCategoryForm } from "@/app/[locale]/[categoryId]/_modules/components/AddSubCategory/AddSubCategoryForm";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    refresh: jest.fn(),
    pathname: "/",
    query: {},
    asPath: "/",
  })),
}));

describe("AddSubCategoryForm component", () => {
  function Wrapper({ children }: { children: ReactNode }): ReactNode {
    return (
      <IntlWrapper>
        <QueryWrapper>{children}</QueryWrapper>
      </IntlWrapper>
    );
  }

  it("should have input 'name of the category' text", () => {
    render(
      <AddSubCategoryForm categoryId={1} onClose={() => {}} userId={1} />,
      {
        wrapper: Wrapper,
      },
    ); //ARRANGE

    const inputNode = screen.getByLabelText("The name of the sub category*"); //ACT

    expect(inputNode).toBeInTheDocument(); //ASSERT
  });

  it("should have input 'description of the category' text", () => {
    render(
      <AddSubCategoryForm categoryId={1} onClose={() => {}} userId={1} />,
      {
        wrapper: Wrapper,
      },
    ); //ARRANGE

    const inputNode = screen.getByLabelText(
      "The description of the subCategory*",
    ); //ACT

    expect(inputNode).toBeInTheDocument(); //ASSERT
  });

  it("should have submit button", () => {
    render(
      <AddSubCategoryForm categoryId={1} onClose={() => {}} userId={1} />,
      {
        wrapper: Wrapper,
      },
    ); //ARRANGE

    const submitButton = screen.getByRole("button", {
      name: "Save new sub category",
    }); //ACT

    expect(submitButton).toBeInTheDocument(); //ASSERT
  });
});
