const nxPreset = require('@nx/jest/preset').default

module.exports = {
  ...nxPreset,
  collectCoverage: true,
  coverageReporters: ['html', 'clover'],
  collectCoverageFrom: [
    '**/*.ts',
    '!**/__tests__/**',
    '!*.spec.ts',
    '!**/dist/**',
    '!**/node_modules/**',
    '!**/jest.config.ts',
    '!**/jest.e2e.ts'
  ],
  moduleNameMapper: {
    '@m8a/nestjs-query-core': process.cwd() + '/packages/core/src',
    '@m8a/nestjs-query-graphql': process.cwd() + '/packages/query-graphql/src',
    '@m8a/nestjs-query-typeorm': process.cwd() + '/packages/query-typeorm/src',
    '@m8a/nestjs-query-sequelize': process.cwd() + '/packages/query-sequelize/src',
    '@m8a/nestjs-query-typegoose': process.cwd() + '/packages/query-typegoose/src',
    '@m8a/nestjs-query-mongoose': process.cwd() + '/packages/query-mongoose/src'
  },
  testEnvironment: 'node',
  setupFilesAfterEnv: ['jest-extended'],
  testTimeout: 10000
}
