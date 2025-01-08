import { render } from "@testing-library/react";
import Wrapper from "@/testMockUps/intlMoskUpProvider";
import { screen } from "@testing-library/dom";
import { CategoryItem } from "@/app/[locale]/_modules/components/CategoryItem";
import { TCategory } from "@/db/drizzle/schemas/categorySchema";

describe("CategoryItem component", () => {
  const categoryDummyData: TCategory = {
    id: 1,
    name: "Category 1",
    description: "Description of category",
    createdAt: new Date(),
    userId: 1,
    image: null,
  };
  it("should heading be in the document", async () => {
    render(<CategoryItem category={categoryDummyData} locale={"en-US"} />, {
      wrapper: Wrapper,
    }); //ARRANGE

    const elem = screen.getByRole("heading", {
      name: categoryDummyData.name,
    }); //ACT
    expect(elem).toBeInTheDocument(); //ASSERT
  });

  it("should not heading be in the DOM", () => {
    const data = {
      ...categoryDummyData,
      id: null,
    };
    // @ts-expect-error for testing purposes
    render(<CategoryItem category={data} locale={"en-US"} />, {
      wrapper: Wrapper,
    }); //ARRANGE

    const elem = screen.queryByRole("heading"); //ACT

    expect(elem).toBeNull(); //ASSERT
  });
});
