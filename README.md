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

### Create Auth Layout Route

1. Create `routes/src/routes/_auth/route.tsx`
2. Move `login.tsx` & `join.tsx` into the `_auth` folder.
3. Center an

```tsx
<Outlet />
```

in the route.

### Create Join Page

1. In `join.tsx`, create a form that takes an email & 2 passwords & 'Join' button
2. 'Already have an account?' button
3. Improve Styling

### Componentize into Auth Card

First, we create a `src/components` folder. This is were we will start componentizing our main components with tailwind variants, so we don't have to copy styles everywhere!

1. Install clsx, tailwind-merge & tailwind-variants

```
npm i clsx tailwind-merge tailwind-variants
```

2. Create `cn.ts` in `src/utils`

```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

3. Create `src/components/Input.tsx`

Create a tailwind variant & spread all the props and apply the variant classname

```tsx
import type { InputHTMLAttributes } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const inputStyles = tv({
  base: 'py-2 px-3 border-foreground-subtle rounded-lg border outline-none ',
  variants: {
    color: {
      default: null,
      error: 'border-destructive',
    },
  },
  defaultVariants: {
    color: 'default',
  },
})

export default function Input({ className, color, ...props }: InputProps) {
  return <input {...props} className={inputStyles({ color, className })} />
}

type InputVariants = VariantProps<typeof inputStyles>

type InputProps = InputVariants & InputHTMLAttributes<HTMLInputElement> & {}
```

4. Create `src/components/Button.tsx`

Very similar to input, but also with a size variant

```tsx
import type { ButtonHTMLAttributes } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const buttonStyles = tv({
  base: 'rounded transition-colors size-fit',
  variants: {
    color: {
      primary: 'bg-primary text-primary-foreground hover:bg-primary-hover',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary-hover',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive-hover',
      warning: 'bg-warning text-warning-foreground hover:bg-warning-hover',
      success: 'bg-success text-success-foreground hover:bg-success-hover',
    },
    size: {
      icon: 'p-2',
      small: 'px-4 py-1.5',
      medium: 'px-5 py-2',
      large: 'px-6 py-4',
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'medium',
  },
})

export default function Button({ className, color, size, ...props }: ButtonProps) {
  return <button {...props} className={buttonStyles({ color, size, className })} />
}

type ButtonVariants = VariantProps<typeof buttonStyles>

type ButtonProps = ButtonVariants & ButtonHTMLAttributes<HTMLButtonElement> & {}
```

5. Update Landing page (`index.tsx`) to use the new button

6. Update `join.tsx` to use the new Input & Button

Next, we create a new `src/features` folder. This will organize code that is only for a specific feature (`src/features/auth`)

1. Create `src/features/auth/components/AuthCard.tsx`
2. Move Join form into this component
3. Add `@` import alias

Add `"compilerOptions"` to `tsconfig.json`

```json
"compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
```

Add within the already defined `"compilerOptions"` of `tsconfig.app.json`

```json
"baseUrl": ".",
"paths": {
  "@/*": ["./src/*"]
}
```

Install `node` types

```
npm install -D @types/node
```

Update `vite.config.ts` with `resolve.alias`

```ts
import { defineConfig } from 'vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [TanStackRouterVite({ target: 'react', autoCodeSplitting: true }), react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

Update the imports of the components to use the `@`

```ts
import Button from '@/components/Button'
import Input from '@/components/Input'
```

4. Add prop to distinguish between join/login
5. Add conditionals to support login as well.
6. Use on `login.tsx` & `join.tsx`

### Supabase Email/Password Auth

Here we add the actual login/join functionality after submitting the form.

1. In `join.tsx` we will implement AuthCard's onSubmit to create an account with Supabase, then direct them to the login page.

```tsx
function RouteComponent() {
  const navigate = useNavigate()

  const handleJoin = useCallback(
    async (email: string, password: string) => {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) return alert(error.message)

      alert('Check your email for the confirmation link!')

      navigate({
        to: '/login',
        search: { email },
      })
    },
    [navigate]
  )

  return <AuthCard type="join" onSubmit={handleJoin} />
}
```

2. Let's implement the login version

```tsx
function RouteComponent() {
  const navigate = useNavigate()

  const handleLogin = useCallback(
    async (email: string, password: string) => {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) return alert(error.message)

      navigate({
        to: '/dashboard',
        replace: true,
      })
    },
    [navigate]
  )
  return <AuthCard type="login" onSubmit={handleLogin} />
}
```

3. Let's autofill login email when joining!

First, we need to install `zod` so we can do clean validation.

```
npm i zod
```

We are now going to create a SearchSchema in `login.tsx`

```ts
const SearchSchema = z.object({
  email: z.string().email().optional(),
})
```

Fully implemented will look like this

```tsx
export const Route = createFileRoute('/_auth/login')({
  validateSearch(search) {
    return SearchSchema.parse(search)
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { email } = Route.useSearch()
  const navigate = useNavigate()

  const handleLogin = useCallback(
    async (email: string, password: string) => {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) return alert(error.message)

      navigate({
        to: '/dashboard',
        replace: true,
      })
    },
    [navigate]
  )
  return <AuthCard type="login" onSubmit={handleLogin} defaultEmail={email} />
}

const SearchSchema = z.object({
  email: z.string().email().optional(),
})
```

And some edits to `AuthCard.tsx`

```tsx
interface AuthCardProps {
  defaultEmail?: string
  type: 'login' | 'join'
  onSubmit: (email: string, password: string) => void
}
export default function AuthCard({ type, defaultEmail, onSubmit }: AuthCardProps) {
  return <Input name="email" type="email" placeholder="Email" required defaultValue={defaultEmail} />
}
```

TEST!

### User Query, Redirects & Logout

We need to make sure the user is logged in to access certain routes. This is also where we will introduce our first query.

1. Create a `User.ts` file in `src/api/queries`

```ts
import { queryOptions } from '@tanstack/react-query'
import supabase from '@/api/Supabase'

export const UserQueryOptions = queryOptions({
  queryKey: ['user'],
  async queryFn() {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    return user
  },
})
```

2. In the `_auth/route.tsx` file, we will add a redirect to dashboard if already logged in.

```ts
export const Route = createFileRoute('/_auth')({
  async loader({ context: { queryClient } }) {
    const user = await queryClient.fetchQuery(UserQueryOptions)
    if (user) return redirect({ to: '/dashboard' })
  },
})
```

3. Do a reverse logic in `_app/route.tsx` to redirect to '/'

```ts
export const Route = createFileRoute('/_app')({
  async loader({ context: { queryClient } }) {
    const user = await queryClient.fetchQuery(UserQueryOptions)
    if (!user) return redirect({ to: '/' })
  },
})
```

4. In the `index.tsx` landing page, we will ensure the query in the loader, then use that query to either show Join/Login buttons or an Enter Dashboard button.

```ts
export const Route = createFileRoute('/')({
  async loader({ context: { queryClient } }) {
    await queryClient.ensureQueryData(UserQueryOptions)
  },
})
```

```tsx
function Nav() {
  const { data: user } = useSuspenseQuery(UserQueryOptions)

  return (
    //...
        {user ? (
          <>
            <Link to="/dashboard">
              <Button size="small">Enter Dashboard</Button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button color="secondary" size="small">
                Login
              </Button>
            </Link>
            <Link to="/join">
              <Button size="small">Join</Button>
            </Link>
          </>
        )}
    //...
  )
}

function Hero() {
  const { data: user } = useSuspenseQuery(UserQueryOptions)

  return (
    //...
      <Link to={user ? '/dashboard' : '/login'}>
        <Button size="large">{user ? 'Go to Dashboard' : 'Get Started'}</Button>
      </Link>
    //...
  )
}
```

5. Add logout button to the Dashboard. Should clear queryClient & redirect too

```tsx
function RouteComponent() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const handleLogout = useCallback(async () => {
    const { error } = await supabase.auth.signOut()
    if (error) return alert(error.message)
    queryClient.clear()
    navigate({
      to: '/',
      replace: true,
    })
  }, [navigate, queryClient])

  return (
    <div>
      Hello "/_app/dashboard"!
      <br />
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  )
}
```

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
