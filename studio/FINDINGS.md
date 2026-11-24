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

## 12. Dashboard blocks each install an unguarded demo route

- **What happened:** activity-01, file-manager-01, upload-01, settings-01, profile-01 and
  onboarding-01 write `app/activity`, `app/files`, `app/upload`, `app/settings`, `app/profile`
  and `app/onboarding`. In an app with auth they are public copies beside the real pages, and
  four of them (files, upload, settings, profile) say in a comment to move the content into
  "sidebar-07's shell" whatever sidebar the app uses.
- **Repro:** `npx shadcn@latest add @mangacn/settings-01`, then open `/settings` signed out.
- **Workaround:** Studio deletes the six routes and renders the blocks' components from its own
  pages under `/app` (as in finding 8).
- **Suggested fix:** as finding 8: say so in the install output, or ship the page as an example
  only (no `registry:page` target).

## 13. profile-01 / upload-01 fail `react-hooks/set-state-in-effect`

- **What happened:** `npm run lint` fails right after install: `components/profile-form.tsx`
  (`setPreview(undefined)` in the photo effect) and `components/upload-form.tsx` (`setRunning`
  and the announcement in the "run ended" effect).
- **Repro:** add both blocks to a `create-next-app@16` project, `npm run lint`.
- **Workaround:** `eslint.config.mjs` turns the rule off for those two files.
- **Suggested fix:** derive the preview URL with `useMemo` plus a cleanup effect; end the
  upload run inside the interval's `setUploads` updater instead of a watching effect.

## 14. settings-01 / profile-01 / upload-01: a save is announced to screen readers only

- **What happened:** Save, Save password and Publish set an `sr-only` `role="status"`; a sighted
  user sees nothing happen.
- **Repro:** the block's `/settings`, press Save.
- **Workaround:** Studio passes `onSave` / `onSaveProfile` / `onSavePassword` / `onPublish` and
  shows a sonner toast from site code (`components/studio/desk-forms.tsx`).
- **Suggested fix:** a visible inline status beside the button (or a toast option), keeping the
  live region.

## 15. onboarding-01: no skip, and its last link 404s by default

- **What happened:** the flow has no Skip / "later" action or prop. The summary's "Go to
  library" uses `libraryHref`, which defaults to `/library`, a route nothing installs.
- **Repro:** install onboarding-01, finish the flow, click "Go to library".
- **Workaround:** Studio passes `libraryHref="/app"` and adds "Skip for now" in its own
  `/welcome` page header (a form posting a server action that clears the first-run cookie).
- **Suggested fix:** an `onSkip` prop (rendered beside Back), and a default href of `/` or a
  required prop.

## 16. onboarding-01 / settings-01 / profile-01 / activity-01: reader copy is fixed

- **What happened:** the blocks are written for a reader app: onboarding-01's title, intro
  ("your library is ready"), "I mostly read", the daily reading reminder and the genre list;
  settings-01's "Your shelves, comments and reading history"; profile-01's "What other readers
  see"; activity-01's kinds (`reading | comments | follows`), filter labels and "Recent
  activity" heading. None of it is a prop, so a creator dashboard reads slightly off.
- **Workaround:** Studio keeps the copy and picks data that fits it (the activity feed is
  Lantern Tide's readers reading, commenting and following).
- **Suggested fix:** `title` / `description` props per block, and `filters` / `kindLabels`
  props on `ActivityFeed` with the reader set as default.

## 17. activity-01: `ActivityStats` uses a fixed element id

- **What happened:** the section's heading id is the literal `activity-stats-title`, so two
  `ActivityStats` on one page share an id (and the second section is labelled by the first).
- **Repro:** render `<ActivityStats />` twice; check `aria-labelledby`.
- **Workaround:** none needed: Studio renders it once.
- **Suggested fix:** `React.useId()`, as `ActivityFeed` already does.

## 18. sonner: follows `next-themes`, but nothing installs its provider

- **What happened:** the Toaster reads `useTheme()` from `next-themes`; without a
  `ThemeProvider` (mangacn's theme does not set one up) the theme is `undefined`, so it falls
  back to `"system"` and sonner follows the OS dark setting while the site stays light.
- **Repro:** read `components/ui/sonner.tsx`: `const { theme = "system" } = useTheme()`, passed to
  sonner's `theme`; with no provider that is always `"system"` (read from the code, not run
  under a dark OS).
- **Workaround:** Studio passes `theme="light"` (the Toaster spreads its props last).
- **Suggested fix:** mention the provider in the docs, or read the `.dark` class on `<html>`.

## 19. settings-01 and profile-01 both edit the display name

- **What happened:** settings-01's Account section and profile-01's Public profile each have a
  required "Display name" field, so on one settings page the same value is edited twice.
- **Workaround:** Studio shows both blocks as shipped on `/app/settings`, filled from one value.
- **Suggested fix:** let settings-01 hide a section or field (`sections={[...]}`), or drop the
  display name from one of the two blocks.
