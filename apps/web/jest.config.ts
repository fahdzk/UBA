
import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({ dir: "./" });

const config: Config = {
  testEnvironment: "jsdom",
  setupFilesAfterSetup: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@uba/(.*)$": "<rootDir>/../../packages/$1/src",
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/__tests__/e2e/"],
  coverageThreshold: {
    global: { branches: 70, functions: 70, lines: 70, statements: 70 },
  },
};

export default createJestConfig(config);
