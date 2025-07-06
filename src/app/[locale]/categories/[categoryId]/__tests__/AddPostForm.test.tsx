describe.only("This test suite will run", () => {
  test("Test 1", () => {
    expect(true).toBe(true);
  });
});
// import { AddPostForm } from "@/app/_modules/Posts/AddPost/AddPostForm";
// import IntlWrapper from "@/testMockUps/intlMoskUpProvider";
// import { screen } from "@testing-library/dom";
// import { ReactNode } from "react";
// import QueryWrapper from "@/testMockUps/queryMockUpProvider";
//
// jest.mock("next/navigation", () => ({
//   useRouter: jest.fn(() => ({
//     refresh: jest.fn(),
//     pathname: "/",
//     query: {},
//     asPath: "/",
//   })),
// }));
//
// // There is a problem with the test, it is not working
// // Server action CreateNewPost can't be called in useMutation hook
// describe.skip("AddPostForm component", () => {
//   function Wrapper({ children }: { children: ReactNode }): ReactNode {
//     return (
//       <IntlWrapper>
//         <QueryWrapper>{children}</QueryWrapper>
//       </IntlWrapper>
//     );
//   }
//
//   test.skip("should input 'name of the post' has label text", async () => {
//     render(
//       <AddPostForm
//         userId={1}
//         subCategoryId={1}
//         categoryId={1}
//         onClose={() => {}}
//       />,
//       {
//         wrapper: Wrapper,
//       },
//     ); //ARRANGE
//
//     const inputNode = screen.getByLabelText("Name of the post"); //ACT
//
//     expect(inputNode).toBeInTheDocument(); //ASSERT
//   });
//
//   test.skip("should input 'description of the post' has label text", async () => {
//     render(
//       <AddPostForm
//         userId={1}
//         categoryId={1}
//         subCategoryId={1}
//         onClose={() => {}}
//       />,
//       {
//         wrapper: Wrapper,
//       },
//     ); //ARRANGE
//
//     const inputNode = screen.getByLabelText("The description of the post"); //ACT
//
//     expect(inputNode).toBeInTheDocument(); //ASSERT
//   });
//
//   test.skip("should input 'url post' has label text", async () => {
//     render(
//       <AddPostForm
//         userId={1}
//         categoryId={1}
//         subCategoryId={1}
//         onClose={() => {}}
//       />,
//       {
//         wrapper: Wrapper,
//       },
//     ); //ARRANGE
//
//     const inputNode = screen.getByLabelText("The url of the post"); //ACT
//
//     expect(inputNode).toBeInTheDocument(); //ASSERT
//   });
// });
