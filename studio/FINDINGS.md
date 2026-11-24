# mangacn findings: Studio

Things found while building Studio with mangacn items used as installed. Each item was worked
around in site code; no installed file was edited.

## 1. login-02 / signup-02: the route page cannot pass anything to the form

- **What happened:** `app/login/page.tsx` renders `<LoginForm />` with no props (same for
  `app/signup/page.tsx` and `<SignupForm />`). The form spreads `form` props, so it can take an
  `action`, but the page gives no way in. The page also hardcodes the sample brand
  ("Inkpot Studio") and its link home.
- **Repro:** `npx shadcn@latest add @mangacn/login-02`, then try to wire a server action without
  editing `app/login/page.tsx`.
- **Workaround:** Studio replaces both route pages with site code that composes the untouched
  form: `<LoginForm action={signIn} />`.
- **Suggested fix:** keep the forms as the reusable part and say in the page comment that the page
  is a demo to replace; or ship the page as a component that takes `formProps` and a `brand` slot.

## 2. login-02 / signup-02: inputs have no `name`

- **What happened:** the inputs carry `id` but no `name`, so a submitted `FormData` is empty and a
  server action cannot read the email or password.
- **Repro:** read `components/login-form.tsx` / `components/signup-form.tsx`: no `<Input>` has a
  `name=` attribute, and the browser only puts named controls in `FormData`.
- **Workaround:** none needed for Studio: its fake auth ignores the values on purpose.
- **Suggested fix:** add `name="email"`, `name="password"` (and `name`, `confirm-password` on
  signup), matching stock shadcn's intent for real forms.

## 3. login-02: "Forgot your password?" links to a route the block does not ship

- **What happened:** the form links to `/forgot-password`, which 404s after install.
- **Repro:** install login-02, click "Forgot your password?".
- **Workaround:** Studio adds `app/forgot-password/page.tsx` (a short memo pointing back to login).
- **Suggested fix:** link to `#`, or take the href as a prop.

## 4. login-02 / signup-02: copy and the GitHub button are fixed

- **What happened:** title, description, placeholders ("John Doe", "m@example.com") and the
  "with GitHub" button are hardcoded; the GitHub button has no handler or prop. signup-02 says
  "Must be at least 8 characters long" but the input has no `minLength`.
- **Workaround:** Studio leaves them as shipped and adds a "demo desk" note under each form.
- **Suggested fix:** props for title/description, an optional `socialProviders` slot, and
  `minLength={8}` where the hint promises it.

## 5. sidebar-08: `AppSidebar` hardcodes its sample data

- **What happened:** the nav sections, projects, support links and user live in a `const data`
  inside `components/app-sidebar.tsx`; the component takes only `Sidebar` props.
- **Workaround:** Studio composes its own `components/studio/studio-sidebar.tsx` from the
  installed `ui/sidebar` parts and the block's `NavSecondary`; `AppSidebar` is left installed and
  unused.
- **Suggested fix:** take `data` (or `navMain`, `user`, ...) as props, defaulting to the sample.

## 6. sidebar-08: `NavMain` has no current-page state and uses plain `<a>`

- **What happened:** `isActive` on an item only sets the collapsible's `defaultOpen`; nothing
  sets `SidebarMenuButton`'s `isActive`, so the current page is never inked. Links are `<a href>`,
  so every click is a full page load in Next.
- **Workaround:** Studio renders its own menu with `isActive={pathname === url}`,
  `aria-current="page"` and `next/link` as the button's `render`.
- **Suggested fix:** split "open" and "current" (`defaultOpen` vs `isActive`), and accept a link
  component or a `renderLink` prop.

## 7. sidebar-08: `NavUser`'s "Log out" does nothing

- **What happened:** the account menu's items (Upgrade, Account, Billing, Notifications, Log out)
  are `DropdownMenuItem`s with no handlers or props to pass one.
- **Workaround:** Studio's sidebar footer shows the user and a `Log out` `SidebarMenuButton`
  inside a `<form action={signOut}>`.
- **Suggested fix:** an `onLogout` prop (or `actions` slot) on `NavUser`.

## 8. sidebar-08: installs an unguarded demo route

- **What happened:** the block writes `app/dashboard/page.tsx`. In an app with auth this is a
  second, unprotected shell beside the real one.
- **Workaround:** Studio deletes `app/dashboard/`.
- **Suggested fix:** note it in the install output, or target a path under the docs' examples.

## 9. Installed files fail `next lint` defaults (eslint-config-next 16)

- **What happened:** `npm run lint` fails right after install:
  - `@next/next/no-html-link-for-pages` on `<a href="/">` in login-02's and signup-02's pages and
    in sidebar-08's `app-sidebar.tsx`;
  - `react-hooks/set-state-in-effect` on `hooks/use-mobile.ts` (the initial `setIsMobile` call in
    the effect).
- **Repro:** `create-next-app@16`, `shadcn init`, add the three blocks, `npm run lint`.
- **Workaround:** the two pages are replaced by site code (finding 1). For the two kept files,
  `eslint.config.mjs` turns off the one rule per file.
- **Suggested fix:** use `next/link` in Next-targeted blocks (or a framework-neutral link prop);
  in `use-mobile`, read the media query with `useSyncExternalStore`.

## 10. `shadcn add` stops on an overwrite prompt after `shadcn init`

- **What happened:** `shadcn init` (base-nova) writes stock `components/ui/button.tsx`; adding
  login-02 / signup-02 / sidebar-08 then asks "The file button.tsx already exists. Would you like
  to overwrite?" even with `--yes`, and the install stops there in a non-interactive shell.
- **Repro:** `create-next-app@16`, `npx shadcn@latest init -d`, add the registry, then
  `npx shadcn@latest add @mangacn/login-02 --yes`.
- **Workaround:** re-run with `--overwrite` (mangacn's button replaces stock's).
- **Suggested fix:** say so in the install docs (`--overwrite` after `init`), or ship a mangacn
  init/preset that does not write stock ui files first.

## 11. Vertical `Separator` at small heights draws as a curve

- **What happened:** in sidebar-08's header (`data-vertical:h-4`), the hand-drawn separator bows
  into a ")" shape next to the trigger, which reads like a stray bracket.
- **Repro:** the `/app` header in `.shots/app-overview-1280.png`.
- **Workaround:** left as shipped.
- **Suggested fix:** scale `ink-bowing` with the line's length, or keep short separators straight.
