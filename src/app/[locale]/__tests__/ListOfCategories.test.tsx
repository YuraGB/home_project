import { render, waitFor } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { ListOfCategories } from "@/app/[locale]/_modules/components/ListOfCategories";
import Wrapper from "@/testMockUps/intlMoskUpProvider";

describe("ListOfCategories component", () => {
  const listData = [
    {
      id: 1,
      name: "Category 1",
      description: "Description of category",
      createdAt: new Date(),
      userId: 1,
      image: null,
    },
    {
      id: 2,
      name: "Category 2",
      description: "Description of category",
      createdAt: new Date(),
      userId: 1,
      image: null,
    },
  ];
  const locale = "en-US";

  it("should have text", async () => {
    render(<ListOfCategories categories={listData} locale={locale} />, {
      wrapper: Wrapper,
    }); //ARRANGE

    const elem = screen.queryByText("Category 1"); //ACT

    await waitFor(
      () => expect(elem).toBeInTheDocument(),
      { timeout: 1000 }, //ASSERT
    );
  });

  it("should not to be in the DOM", () => {
    render(<ListOfCategories categories={[]} locale={locale} />, {
      wrapper: Wrapper,
    }); //ARRANGE

    const elem = screen.queryByText("Category 1"); //ACT

    expect(elem).toBeNull(); //ASSERT
  });
});
