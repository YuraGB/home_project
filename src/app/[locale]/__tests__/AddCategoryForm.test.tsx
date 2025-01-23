import { render } from "@testing-library/react";
import IntlWrapper from "@/testMockUps/intlMoskUpProvider";
import { screen } from "@testing-library/dom";
import { AddCategoryForm } from "@/app/[locale]/_modules/components/AddCategoryForm";
import QueryWrapper from "@/testMockUps/queryMockUpProvider";
import { ReactNode } from "react";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    refresh: jest.fn(), // Мок функції refresh
  })),
}));

describe("AddCategoryForm component", () => {
  function Wrapper({ children }: { children: ReactNode }): ReactNode {
    return (
      <IntlWrapper>
        <QueryWrapper>{children}</QueryWrapper>
      </IntlWrapper>
    );
  }

  it("should FormField 'name' has a label and be in the document", async () => {
    render(<AddCategoryForm userId={1} onCloseAction={() => {}} />, {
      wrapper: Wrapper,
    }); //ARRANGE

    const inputNode = screen.getByLabelText("Name of the category*"); //ACT

    expect(inputNode).toBeInTheDocument(); //ASSERT
  });

  it("should FormField 'description' has a label and be in the document", async () => {
    render(<AddCategoryForm userId={1} onCloseAction={() => {}} />, {
      wrapper: Wrapper,
    }); //ARRANGE

    const inputNode = screen.getByLabelText("Description*"); //ACT

    expect(inputNode).toBeInTheDocument(); //ASSERT
  });

  it("should submit button be in the document", async () => {
    render(<AddCategoryForm userId={1} onCloseAction={() => {}} />, {
      wrapper: Wrapper,
    }); //ARRANGE

    const inputNode = screen.getByRole("button", {
      name: "Save new category",
    }); //ACT

    expect(inputNode).toBeInTheDocument(); //ASSERT
  });
});
