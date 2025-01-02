import { render } from "@testing-library/react";
import { AddPostForm } from "@/app/_modules/Posts/AddPost/AddPostForm";
import IntlWrapper from "@/testMockUps/intlMoskUpProvider";
import { screen } from "@testing-library/dom";
import { ReactNode } from "react";
import QueryWrapper from "@/testMockUps/queryMockUpProvider";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    refresh: jest.fn(),
    pathname: "/",
    query: {},
    asPath: "/",
  })),
}));

describe("AddPostForm component", () => {
  function Wrapper({ children }: { children: ReactNode }): ReactNode {
    return (
      <IntlWrapper>
        <QueryWrapper>{children}</QueryWrapper>
      </IntlWrapper>
    );
  }
  it("should input 'name of the post' has label text", async () => {
    render(
      <AddPostForm
        userId={1}
        subCategoryId={1}
        categoryId={1}
        onClose={() => {}}
      />,
      {
        wrapper: Wrapper,
      },
    ); //ARRANGE

    const inputNode = screen.getByLabelText("Name of the post"); //ACT

    expect(inputNode).toBeInTheDocument(); //ASSERT
  });

  it("should input 'description of the post' has label text", async () => {
    render(
      <AddPostForm
        userId={1}
        categoryId={1}
        subCategoryId={1}
        onClose={() => {}}
      />,
      {
        wrapper: Wrapper,
      },
    ); //ARRANGE

    const inputNode = screen.getByLabelText("The description of the post"); //ACT

    expect(inputNode).toBeInTheDocument(); //ASSERT
  });

  it("should input 'url post' has label text", async () => {
    render(
      <AddPostForm
        userId={1}
        categoryId={1}
        subCategoryId={1}
        onClose={() => {}}
      />,
      {
        wrapper: Wrapper,
      },
    ); //ARRANGE

    const inputNode = screen.getByLabelText("The url of the post"); //ACT

    expect(inputNode).toBeInTheDocument(); //ASSERT
  });
});
