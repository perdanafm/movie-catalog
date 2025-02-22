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
  transformIgnorePatterns: ['/node_modules/(?!(@/.*)/)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['../jest.setup.js'],
  rootDir: 'src',
  collectCoverage: true,
  coverageDirectory: '../coverage',
};
