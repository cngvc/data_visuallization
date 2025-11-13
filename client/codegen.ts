import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:4000/graphql',
  documents: ['src/**/*.tsx', 'src/**/*.ts'],
  generates: {
    'src/graphql/generated.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typed-document-node'
      ],
      config: {
        useTypeImports: true,
        enumsAsTypes: true,
        scalars: {
          Date: 'Date',
          JSON: 'Record<string, any>',
          Upload: 'File'
        }
      }
    }
  }
};

export default config;
