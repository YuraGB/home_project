import { render } from "@testing-library/react";
import LoginForm from "@/app/[locale]/(auth)/login/_modules/login_form/login_form";
import IntlWrapper from "@/testMockUps/intlMoskUpProvider";
import { screen } from "@testing-library/dom";
import QueryWrapper from "@/testMockUps/queryMockUpProvider";
import { ReactNode } from "react";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    refresh: jest.fn(),
    pathname: "/",
    query: {},
    push: jest.fn(),
    asPath: "/",
  })),
}));

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(() => ({
    data: { user: { name: "Test User" }, expires: "2099-01-01T00:00:00.000Z" },
    status: "authenticated",
  })),
  SessionProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ), // Простий мок для провайдера
}));

describe("loginForm component", () => {
  function Wrapper({ children }: { children: ReactNode }): ReactNode {
    return (
      <IntlWrapper>
        <QueryWrapper>{children}</QueryWrapper>
      </IntlWrapper>
    );
  }
  it("should have email form field", () => {
    render(<LoginForm />, {
      wrapper: Wrapper,
    }); //ARRANGE

    const elem = screen.getByLabelText("E-email*"); //ACT
    expect(elem).toBeInTheDocument(); //ASSERT
  });

  it("should have password form field", () => {
    render(<LoginForm />, {
      wrapper: Wrapper,
    }); //ARRANGE

    const elem = screen.getByLabelText("Password*"); //ACT
    expect(elem).toBeInTheDocument(); //ASSERT
  });
});
