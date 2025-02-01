import { PostsList } from "@/app/_modules/Posts/PostsList";
import { render, waitFor } from "@testing-library/react";
import Wrapper from "@/testMockUps/intlMoskUpProvider";
import { screen } from "@testing-library/dom";
import { TPostWithRating } from "@/server/lib/formatPostData";

describe("PostList component", () => {
  const posts: TPostWithRating[] = [
    {
      id: 1,
      name: "Post 1",
      url: "post-1",
      subCategoryId: 1,
      description: "Content of post",
      createdAt: new Date(),
      categoryId: 1,
      userId: 1,
      image: null,
      rate: null,
    },
    {
      id: 2,
      name: "Post 2",
      url: "post-2",
      subCategoryId: 1,
      description: "Content of post",
      createdAt: new Date(),
      categoryId: 1,
      userId: 1,
      image: null,
      rate: null,
    },
  ];
  it("should have heading of the post name", async () => {
    render(<PostsList posts={posts} />, {
      wrapper: Wrapper,
    }); //ARRANGE

    const elem = screen.getByText(posts[0].name); //ACT

    await waitFor(
      () => expect(elem).toBeInTheDocument(), //ASSERT
    );
  });

  it("should not to be in the DOM", () => {
    render(<PostsList posts={[]} />, {
      wrapper: Wrapper,
    }); //ARRANGE

    const elem = screen.queryByText(posts[0].name); //ACT

    expect(elem).toBeNull(); //ASSERT
  });
});
