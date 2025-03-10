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
  transform: {
    "^.+\\.tsx?$": "babel-jest", // Для TypeScript
    "^.+\\.jsx?$": "babel-jest", // Для JavaScript
  },
  moduleNameMapper: {
    "\\.(css|scss|sass)$": "identity-obj-proxy", // Для стилів
  },
  transformIgnorePatterns: ["/node_modules/(?!jose)/"],
  coverageReporters: ["json", "lcov", "text", "clover"],
  testEnvironment: "jsdom",
  setupFiles: ["dotenv/config"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testMatch: [
    "<rootDir>/src/app/\\[locale\\]/\\(auth\\)/**/*.test.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/*.{test,spec}.{js,jsx,ts,tsx}",
  ],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/.next/",
    "<rootDir>/lib/",
    "<rootDir>/server/",
    "<rootDir>/db/",
    "<rootDir>/i18n/",
    "<rootDir>/testMockUps/",
    "<rootDir>src/app/[locale]/categories/[categoryId]/__tests__/AddPostForm.test.tsx",
  ],
};

export default createJestConfig(config);
