export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1', // Maps @/ to src/
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    // process `*.tsx` files with `ts-jest`
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/', // Default: Ignore node_modules
    '\\.ts$', // Ignore .ts files
  ],
  setupFilesAfterEnv: ['../jest.setup.js'],
  rootDir: 'src',
  collectCoverage: true,
  coverageDirectory: '../coverage',
};
