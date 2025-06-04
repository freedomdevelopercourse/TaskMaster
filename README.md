# TaskMaster

## Step 1 - Create Project

### Make & Open folder for Project in VSCode

### Create App `npm create vite@latest .` React -> TypeScript & SWC

```
npm i
```

### Install Tailwind v4, TanStack Router & TanStack Query

```
npm install @tanstack/react-router @tanstack/react-query tailwindcss @tailwindcss/vite
npm install -D @tanstack/router-plugin
```

```ts
import { defineConfig } from 'vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [TanStackRouterVite({ target: 'react', autoCodeSplitting: true }), react(), tailwindcss()],
})
```

### Setup TanStack & Tailwind

2. Update main.tsx to import route tree and initialize Router & Query

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const router = createRouter({ routeTree, context: { queryClient } })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
)
```

3. Delete assets, App.tsx, App.css & update index.css to simply `@import "tailwindcss";`
4. npm run dev
5. Create src/routes/\_\_root.tsx
6. Update \_\_root.tsx to use RootWithContext and add generic

### Update Branding

1. [Favicon Generator](https://www.favicon-generator.org/)
2. Add contents to public folder & delete vite.svg
3. Update index.html

## Step 2 - Connect Supabase

### Create Supabase project

1. Sign in with GitHub
2. Create an Organization
3. Create new project (save DB Password somewhere safe even though we won't need it)
4. Acquire Supabase URL & Anon Key

[Link to JS Supabase Docs](https://supabase.com/docs/reference/javascript/introduction)

### Create ENV File with URL & Anon Key

- Create `.env` in the root of the project & add .env to .gitignore
- Be sure to prefix with VITE\_ so the client can access it

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Install, Export & Generate Supabase Client & Types

1. Install Client

```
npm install @supabase/supabase-js
```

2. Update vite types to acknowledge env file. (vite-env.d.ts)

```ts
/// <reference types="vite/client" />

interface ViteTypeOptions {
  strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

2. Export Client from src/api/Supabase.ts

```ts
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

export default supabase
```

3. Generate Types Script in package.json

- Update package.json scripts

```
 "gen": "supabase gen types typescript --project-id *PROJECT_ID* > src/types/database.types.ts",

```

- Install supabase as a dev dependency

```
npm i -D supabase
```

- Login

```
npx supabase login
```

- Create types folder inside src folder
  Otherwise it can't find the types folder to generate them here: src/types/database.types.ts
  as seen in the script

- Generate the types

```
npm run gen
```

- Add Database type to Supabase.ts

```ts
import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/database.types'

const supabase = createClient<Database>(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

export default supabase
```

## Step 3 - Theme & Routes

- Create css vars for colors

- Set base styles

- Create Routes for Login, Signup, Landing & Dashboard

- Finish Landing Page

## Step 4 - Authentication

- Create Login & Signup page

- Add Email, Google & Apple Auth

- Logout button on Dashboard

## Step 5 - Build Kanban board with Mock Data

- Install DnD Kit

- Create Board

- Create Context, Reducer & CRUD

- Polish Kanban Board functionality

## Step 6 - Create DB Schema

- Create Boards Table

- Create Tasks Table with Relation to the Boards Table ID

## Step 7 - Create API Client Wrapper for required functionality

- KanbanAPI.ts

- Implement API in Context & Derived State

## Step 8 - Share Boards

## Step 9 - Realtime Updates

## Step 10 - Deploy & Next Steps
