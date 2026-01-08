import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  // 1. Use the ESM preset for ts-jest
  preset: 'ts-jest/presets/default-esm', 
  
  testEnvironment: 'node',
  
  // 2. Tell Jest to treat .ts files as ESM
  extensionsToTreatAsEsm: ['.ts'],
  
  // 3. (Crucial) Fix imports that use '.js' extensions in your TS code
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  
  // 4. Configure ts-jest to use ESM mode
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
};

export default config;