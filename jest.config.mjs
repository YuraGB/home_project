import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const config = {
  roots: ["<rootDir>/src/app"],
  collectCoverageFrom: [
    "app/**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
  ],
  coverageReporters: ["json", "lcov", "text", "clover"],
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/.next/",
    "<rootDir>/lib/",
    "<rootDir>/server/",
    "<rootDir>/db/",
    "<rootDir>/i18n/",
    "<rootDir>/testMockUps/",
  ],
  testMatch: [
    "<rootDir>/src/app/\\[locale\\]/\\(auth\\)/**/*.test.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/*.{test,spec}.{js,jsx,ts,tsx}",
  ],
};

export default createJestConfig(config);
