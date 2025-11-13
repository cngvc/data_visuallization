# GraphQL Code Generation Setup

This project uses `@graphql-codegen` to automatically generate TypeScript types and operations from your GraphQL schema.

## Configuration Files

- **`codegen.ts`** - Main configuration for code generation
- **`.graphqlconfig`** - GraphQL IDE configuration for better editor support

## Available Scripts

```bash
# Generate types once
npm run codegen

# Watch for changes and regenerate automatically
npm run codegen:watch
```

## How It Works

1. **Schema**: Reads from `http://localhost:4000/graphql` (your Apollo Server)
2. **Documents**: Scans `src/**/*.tsx` and `src/**/*.ts` for GraphQL queries/mutations
3. **Output**: Generates `src/graphql/generated.ts` with:
   - TypeScript types for all GraphQL types
   - Typed operations (queries/mutations)
   - TypedDocumentNode for type-safe Apollo Client usage

## Usage in Components

```typescript
import { GET_MEMBERS } from '@/graphql/generated';
import { useQuery } from '@apollo/client';

function MyComponent() {
  const { data, loading } = useQuery(GET_MEMBERS);
  // data is fully typed!
}
```

## Before Running Codegen

1. **Start the server**: `npm run server` (or `npm run dev`)
2. **Ensure GraphQL endpoint is running** on `http://localhost:4000/graphql`
3. **Run codegen**: `npm run codegen`

## Customization

Edit `codegen.ts` to:
- Change the GraphQL endpoint URL
- Modify output location
- Add/remove plugins
- Configure scalar types
