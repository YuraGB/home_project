import "@testing-library/jest-dom";

import ResizeObserver from "resize-observer-polyfill";
import { TextEncoder, TextDecoder } from "util";

global.ResizeObserver = ResizeObserver;

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
