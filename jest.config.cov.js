const config = require("./jest.config");

module.exports = {
    ...config,
    collectCoverage: true,
    coverageDirectory: "<rootDir>/coverage/",
    coverageThreshold: {
        global: {
            branches: 95,
            functions: 95,
            lines: 95,
            statements: 95,
        },
    },
    coveragePathIgnorePatterns: ["node_modules", "test/*/.*(mock.ts)"],
};
