module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  coverageDirectory: "<rootDir>/coverage",
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};
