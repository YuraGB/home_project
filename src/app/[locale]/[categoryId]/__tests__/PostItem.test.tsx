import { render } from "@testing-library/react";
import { PostItem } from "@/app/[locale]/[categoryId]/_modules/components/PostsList/PostItem";
import { TDBPost } from "@/db/drizzle/schemas/postsSchema";
import Wrapper from "@/testMockUps/intlMoskUpProvider";
import { screen } from "@testing-library/dom";

describe("PostItem component", () => {
  const post: TDBPost = {
    userId: 1,
    categoryId: 1,
    name: "Post 1",
    description: "Description of post",
    url: "https://www.google.com",
    createdAt: new Date(),
    id: 1,
    image: null,
    subCategoryId: 1,
  };
  it("should have post name", () => {
    render(<PostItem post={post} rate={null} />, {
      wrapper: Wrapper,
    }); //ARRANGE
    const elem = screen.queryByRole("heading", {
      name: post.name,
    }); //ACT
    expect(elem).toBeInTheDocument(); // ASSERT
  });
});
