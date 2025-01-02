import { render } from "@testing-library/react";
import { PostItem } from "@/app/_modules/Posts/PostItem";
import Wrapper from "@/testMockUps/intlMoskUpProvider";
import { screen } from "@testing-library/dom";
import { TPostWithRating } from "@/lib/formatPostData";
import { act } from "react";

describe("PostItem component", () => {
  const post: TPostWithRating = {
    userId: 1,
    categoryId: 1,
    name: "Post 1",
    description: "Description of post",
    url: "https://www.google.com",
    createdAt: new Date(),
    id: 1,
    image: null,
    subCategoryId: 1,
    rate: null,
  };

  it("should have post name", async () => {
    await act(async () => {
      render(<PostItem post={post} />, {
        wrapper: Wrapper,
      }); // ARRANGE
    });
    const elem = screen.queryByRole("heading", {
      name: post.name,
    }); // ACT
    expect(elem).toBeInTheDocument(); // ASSERT
  });
});
