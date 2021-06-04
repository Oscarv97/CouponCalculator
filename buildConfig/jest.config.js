const path = require("path");
module.exports = {
  rootDir: path.join(__dirname, "../"),
  testURL: "http://localhost",

  preset: 'ts-jest',
  testEnvironmentOptions: {
    runScripts: "dangerously", resources: "usable"
  },
  globals: {
    'ts-jest': {
      tsConfig: {
        jsx: "react"
      }
    }
  },

  moduleDirectories: ["node_modules", "jest", "tests"],
  moduleFileExtensions: ["ts", "tsx", "js", "json"],

  
  testMatch: [
    "<rootDir>/src/Tests/**/*.test.+(ts|tsx)",
    "<rootDir>/src/Tests/**/*.steps.+(ts|tsx)"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  transformIgnorePatterns: [
    "/node_modules/(?!test-component).+\\.js$"
  ],
  collectCoverage: true,
  coverageReporters: ["json", "lcov", "text",],
  coverageDirectory: "<rootDir>/coverage",
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}', '!<rootDir>/Tests/**/*.{ts,tsx}'],
 
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  reporters: ["default", "jest-junit", ["./node_modules/jest-html-reporter", {
    "pageTitle": "Test Report"
  }]],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/tests/",
    "/src/index.tsx",
    "/src/serviceWorker.ts",
    "/src/react-app-env.d.ts",
    "/buildConfig/",
    "/jest/",
    "/coverage/",
    "/*/*Fake*",
    "/*/*fake*",
    "/*/*Mock*",
    "/*/*mock*",
    "/package-lock.json",
    "/package.json"
  ],
  coverageThreshold: {
    global: {
      // waiting on testing framework to be build
      // turn back up when its developed
      //
      statements: 10,
      branches: 10,
      functions: 10,
      lines: 10
    }
  },
  setupFiles: ["<rootDir>/buildConfig/jestEnzymeAdapter.js"]
};
