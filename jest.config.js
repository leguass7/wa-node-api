const { compilerOptions } = require('./tsconfig.json')
const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { name } = require('./package.json')

module.exports = {
  verbose: true,
  bail: 0,
  clearMocks: true,
  collectCoverageFrom: ['src/**/*.{js,ts}'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['node_modules', 'setup*.js', '__tests__', 'dist', 'dev.ts'],
  coverageReporters: ['json', 'text', 'lcov', 'clover'],
  moduleDirectories: ['node_modules', 'src'],
  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' }),
  setupFiles: [
    'dotenv/config'
    // '<rootDir>/jest.setup.js'
  ],

  // A preset that is used as a base for Jest's configuration
  preset: 'ts-jest',

  testEnvironment: 'node',

  displayName: { name, color: 'blue' },
}