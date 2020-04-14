module.exports = {
    automock: false,
    browser: false,
    bail: false,
    collectCoverageFrom: [
        'src/**/*.{js,jsx}',
        '!**/node_modules/**',
        '!**/vendor/**'
    ],
    coverageDirectory: '<rootDir>/coverage',
    globals: {
        __DEV__: true
    },
    moduleFileExtensions: ['js', 'json', 'jsx', 'node'],
    transform: {
        '^.+\\.js?$': 'babel-jest'
    },
    verbose: true,
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?',
    testPathIgnorePatterns : ["/node_modules/", "/cypress/**"],
    setupTestFrameworkScriptFile: './rtl.setup.js',
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$/": "<rootDir>/mocks/file_mock.js"
    },
    testURL: 'http://localhost:3000/api/',
    maxConcurrency: 1
};
