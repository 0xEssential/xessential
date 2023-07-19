/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s?$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.json',
        isolatedModules: true,
      },
    ],
  },
};
