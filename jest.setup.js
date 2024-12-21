import "@testing-library/jest-dom";

import ResizeObserver from "resize-observer-polyfill";

global.ResizeObserver = ResizeObserver;

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  }),
);
