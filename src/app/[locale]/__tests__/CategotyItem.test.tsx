import { render } from "@testing-library/react";
import Wrapper from "@/testMockUps/intlMoskUpProvider";
import { screen } from "@testing-library/dom";
import { CategoryItem } from "@/modules/category/components/CategoryItem";
import { TCategory } from "@/db/drizzle/schemas/categorySchema";
import { act } from "react";

describe("CategoryItem component", () => {
  const categoryDummyData: TCategory = {
    id: 1,
    name: "Category 1",
    description: "Description of category",
    createdAt: new Date(),
    userId: 1,
    image: null,
    layoutSchema: null,
  };
  it("should heading be in the document", async () => {
    await act(async () => {
      render(<CategoryItem category={categoryDummyData} locale={"en-US"} />, {
        wrapper: Wrapper,
      });
    }); //ARRANGE

    const elem = screen.getByRole("heading", {
      name: categoryDummyData.name,
    }); //ACT
    expect(elem).toBeInTheDocument(); //ASSERT
  });

  it("should not heading be in the DOM", async () => {
    const data = {
      ...categoryDummyData,
      id: 0,
    };

    await act(async () => {
      render(<CategoryItem category={data} locale={"en-US"} />, {
        wrapper: Wrapper,
      });
    }); //ARRANGE

    const elem = screen.queryByRole("heading"); //ACT

    expect(elem).toBeNull(); //ASSERT
  });
});
