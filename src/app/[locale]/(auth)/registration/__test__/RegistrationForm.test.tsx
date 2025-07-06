import { render } from "@testing-library/react";
import { ReactNode } from "react";
import IntlWrapper from "@/testMockUps/intlMoskUpProvider";
import QueryWrapper from "@/testMockUps/queryMockUpProvider";
import { screen } from "@testing-library/dom";
import RegistrationForm from "@/modules/auth/registrayion/registration_form/registration_form";

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
  ),
}));

describe("RegistrationForm component", () => {
  function Wrapper({ children }: { children: ReactNode }): ReactNode {
    return (
      <IntlWrapper>
        <QueryWrapper>{children}</QueryWrapper>
      </IntlWrapper>
    );
  }

  it("should have User name form field", () => {
    render(<RegistrationForm />, {
      wrapper: Wrapper,
    }); //ARRANGE

    const elem = screen.getByLabelText("User name*"); //ACT
    expect(elem).toBeInTheDocument(); //ASSERT
  });

  it("should have E-mail form field", () => {
    render(<RegistrationForm />, {
      wrapper: Wrapper,
    }); //ARRANGE

    const elem = screen.getByLabelText("E-email*"); //ACT
    expect(elem).toBeInTheDocument(); //ASSERT
  });

  it("should have Password form field", () => {
    render(<RegistrationForm />, {
      wrapper: Wrapper,
    }); //ARRANGE

    const elem = screen.getByLabelText("Password*"); //ACT
    expect(elem).toBeInTheDocument(); //ASSERT
  });
});
