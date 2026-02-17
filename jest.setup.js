import "@testing-library/jest-dom";

import ResizeObserver from "resize-observer-polyfill";
import { TextEncoder, TextDecoder } from "util";

global.ResizeObserver = ResizeObserver;

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => "/mocked-path",
}));

jest.mock("./src/modules/post/hooks/useUpdateLastVisit.ts", () => ({
  useUpdateLastVisit: () => ({ mutate: jest.fn() }),
}));

jest.mock("next-auth", () => ({
  __esModule: true,
  default: jest.fn(),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  }),
);

global.Request = jest.fn(() => ({
  method: "GET",
  // url: '/some-path',
  // add other necessary properties here
}));

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
