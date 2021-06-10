module.exports = {
  modulePaths: ["<rootDir>/src"],
  moduleFileExtensions: ["js", "jsx"],
  testMatch: ["<rootDir>__tests__/**/*.test.js"],
  moduleDirectories: ["node_modules", "src"],
  testPathIgnorePatterns: [
    "<rootDir>/build/",
    "<rootDir>/node_modules/",
    "<rootDir>/jest",
  ],
  coveragePathIgnorePatterns: [
    "<rootDir>/build/",
    "<rootDir>/public/",
    "<rootDir>/node_modules/",
    "<rootDir>/__tests__/",
  ],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "\\.(css|less|scss|sass)$": "jest-transform-css",
  },
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
};
