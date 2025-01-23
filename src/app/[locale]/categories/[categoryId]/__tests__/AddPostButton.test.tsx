import { AddPostButton } from "@/app/_modules/Posts/AddPost/AddPostButton";
import IntlWrapper from "@/testMockUps/intlMoskUpProvider";
import { render, screen } from "@testing-library/react";
import { act, ReactNode } from "react";
import QueryWrapper from "@/testMockUps/queryMockUpProvider";
import AuthMockProvider from "@/testMockUps/sessionMockProvider";
import { getSession, useSession } from "next-auth/react"; // Import getSession and useSession

jest.mock("next-auth/react", () => ({
  ...jest.requireActual("next-auth/react"),
  getSession: jest.fn(),
  useSession: jest.fn(() => ({
    data: { user: { name: "Test User", email: "test@example.com" } },
    status: "authenticated",
  })),
}));

describe("AddPostButton component", () => {
  beforeEach(() => {
    // Mock getSession
    (getSession as jest.Mock).mockResolvedValue({
      user: { id: "1", email: "test@example.com" },
      expires: "2024-12-31T23:59:59.999Z",
    });

    // Mock useSession
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: { id: "1", email: "test@example.com" },
        expires: "2024-12-31T23:59:59.999Z",
      },
      status: "authenticated",
    });
  });

  function Wrapper({ children }: { children: ReactNode }): ReactNode {
    return (
      <IntlWrapper>
        <AuthMockProvider>
          <QueryWrapper>{children}</QueryWrapper>
        </AuthMockProvider>
      </IntlWrapper>
    );
  }

  it("should have text", async () => {
    // Typecast getSession to a mocked function
    const mockedGetSession = getSession as jest.MockedFunction<
      typeof getSession
    >;
    const mockedUseSession = useSession as jest.Mock;

    // Mock the resolved value for getSession
    mockedGetSession.mockResolvedValue({
      user: {
        id: 1,
        email: "test@example.com",
        salt: "string",
        hash: "string",
        expires: "new Date()",
      },
      expires: "new Date()",
    });

    // Mock useSession
    mockedUseSession.mockReturnValue({
      data: {
        user: { id: 1, email: "test@example.com" },
        expires: "new Date()",
      },
      status: "authenticated",
    });
    await act(async () => {
      render(<AddPostButton categoryId={1} subCategoryId={1} />, {
        wrapper: Wrapper,
      }); // ARRANGE
    });

    const elem = screen.getByRole("button", {
      name: "Create new post",
    }); // ACT

    expect(elem).toBeInTheDocument(); // ASSERT
  });
});
