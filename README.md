# TaskMaster - Starter Project

## Step 1 - Create Project

### Make & Open folder for Project in VSCode

I generally go with a new folder in my home/developer folder

### Create App

1. Create a TypeScript React Vite App

```
npm create vite@latest .
```

2. Follow Prompts

Name package `taskmaster`

Select `React -> TypeScript & SWC`

3. Install Dependencies

```
npm i
```

### Install Tailwind v4, TanStack Router & TanStack Query

1. Install the first packages we will use

```
npm install @tanstack/react-router @tanstack/react-query tailwindcss @tailwindcss/vite
npm install -D @tanstack/router-plugin
```

2. Update the vite.config.ts with the plugins

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

```html
<head>
  <meta charset="UTF-8" />
  <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
  <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
  <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
  <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
  <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
  <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
  <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
  <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
  <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  <link rel="manifest" href="/manifest.json" />
  <meta name="msapplication-TileColor" content="#ffffff" />
  <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
  <meta name="theme-color" content="#ffffff" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>TaskMaster</title>
</head>
```

## Step 2 - Connect Supabase

### Create Supabase project

1. Navigate to [Supabase](https://supabase.com)
2. Sign in with GitHub
3. Create an Organization
4. Create new project (save DB Password somewhere safe even though we won't need it)
5. Acquire Supabase URL & Anon Key

[Link to JS Supabase Docs](https://supabase.com/docs/reference/javascript/introduction)

### Create ENV File with URL & Anon Key

- Create `.env` in the root of the project & add `.env` to `.gitignore`
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

2. Update vite types to acknowledge env file contents. `vite-env.d.ts`

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

2. Export Client from `src/api/Supabase.ts`

```ts
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

export default supabase
```

3. Generate Types Script in `package.json`

- Update `package.json` scripts

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

- Create `src/types` folder. Otherwise `npm run gen` can't find the types folder to generate them: `src/types/database.types.ts`
  as seen in the `package.json` script

- Generate the types

```
npm run gen
```

- Add Database type to `Supabase.ts`

```ts
import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/database.types'

const supabase = createClient<Database>(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

export default supabase
```

## Step 3 - Theme, Routes & Landing Page

### Create Theme

1. Update index.css with an `@theme` and apply the background & foreground to `html` & `body`

```css
@import 'tailwindcss';

@theme {
  --color-background: oklch(12.5% 0.02 260);
  --color-background-secondary: oklch(16.5% 0.02 260);
  --color-background-tertiary: oklch(20.5% 0.02 260);
  --color-foreground: oklch(90% 0.02 260);
  --color-foreground-muted: oklch(70% 0.02 260);
  --color-foreground-subtle: oklch(50% 0.03 260);
  --color-primary: oklch(65% 0.2 265);
  --color-primary-foreground: oklch(98% 0.01 260);
  --color-primary-hover: oklch(60% 0.22 265);
  --color-secondary: oklch(50% 0.03 260);
  --color-secondary-foreground: oklch(98% 0.01 260);
  --color-secondary-hover: oklch(45% 0.04 260);
  --color-destructive: oklch(65% 0.25 25);
  --color-destructive-foreground: oklch(98% 0.01 260);
  --color-destructive-hover: oklch(60% 0.27 25);
  --color-success: oklch(70% 0.2 145);
  --color-success-foreground: oklch(98% 0.01 260);
  --color-success-hover: oklch(65% 0.22 145);
  --color-warning: oklch(75% 0.2 80);
  --color-warning-foreground: oklch(98% 0.01 260);
  --color-warning-hover: oklch(70% 0.22 80);
  --color-border: oklch(22% 0.02 260);
  --color-border-subtle: oklch(16.5% 0.02 260);
  --color-ring: oklch(65% 0.2 265);
  --color-ring-destructive: oklch(65% 0.25 25);
}

html,
body {
  @apply bg-background text-foreground min-w-dvh;
}
```

### Create Routes

- Ensure your app is running for TanStack Router Plugin to work...

```
npm run dev
```

1. Create `src/routes/index.tsx` for the Landing page
2. Create `src/routes/login.tsx`, `src/routes/join.tsx`, `src/routes/_app/route.tsx` & `src/routes/_app/dashboard.tsx`
3. Update `route.tsx` to return

```tsx
<Outlet />
```

4. Add `<Link />` between index, login and join routes

### Finish Landing Page (Massive Dopamine Hit)

Here we build the Landing page. Best course of action is follow the video to see how this is built. All of the code can be found on the course GitHub here: [TaskMaster](https://github.com/freedomdevelopercourse/TaskMaster)

Here is an overview of building a Landing Page:

1. Nav Bar
2. Hero
3. About/Features/Testimonials/Etc
4. Footer

## Step 4 - Authentication

### Create Join Page

1. In `join.tsx`, create a form that takes an email & 2 passwords & 'Join' button
2. Ensure the fields are valid & passwords match
3. Call Supabase
4. Show any errors that occur
5. 'Already have an account?' button
6. Improve Styling

### Componentize into Auth Card

Here we create a new `src/features` folder. This will organize code that is only for a specific feature (`src/features/auth`)

1. Create `src/features/auth/components/AuthCard.tsx`
2. Move Join form into this component
3. Add prop to distinguish between join/login
4. Add conditionals to support login as well.
5. Use on `login.tsx` & `join.tsx`

### Supabase Email/Password Auth

Here we add the actual login/join functionality after submitting the form

### User Query & Logout

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
