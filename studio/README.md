# Studio

A demo creator dashboard for a made-up manga studio, built with
[mangacn](https://www.mangacn.com) components from the `@mangacn` shadcn registry. All names and
content are invented. Auth is fake: any email and password log in.

## Routes

| Route | What |
|---|---|
| `/` | Small landing page, links to log in and sign up |
| `/login`, `/signup` | Split-screen auth forms; any input sets a session cookie (already signed in: off to `/app`) |
| `/welcome` | First-run onboarding, shown once after sign-up; skippable |
| `/app` | Overview: stat cards, two screentone charts, the readers' activity feed; an ink-splash loader while the (fake, delayed) data streams in. Redirects to `/login` without the cookie |
| `/app/files` | Folder tree and file table, plus a chapter upload; picked files stay in the browser |
| `/app/settings` | Public profile, password and account settings; saving shows a toast, nothing is sent |

## mangacn items

| Item | Used on |
|---|---|
| `theme`, `theme-blueline` | Every page (site theme) |
| `login-02` (`LoginForm`) | `/login` |
| `signup-02` (`SignupForm`) | `/signup` |
| `sidebar-08` (`ui/sidebar`, `NavSecondary`, header pattern) | `/app/*` |
| `manga-frame`, `halftone-background`, `focus-lines`, `sfx-text` | `/`, `/login`, `/signup` |
| `panel` | `/`, `/forgot-password`, `/app/*` |
| `chart`, `chart-tones` | `/app` (bar charts filled with screentone) |
| `activity-01` (`ActivityStats`, `ActivityFeed`; `stat-card`, `timeline`, `toggle-group`, `badge`) | `/app` |
| `ink-splash-loader` | `/app` (Suspense fallback) |
| `file-manager-01` (`FileManager`; `tree-view`, `table`, `file-upload`, `empty`, `alert-dialog`) | `/app/files` |
| `upload-01` (`UploadForm`; `progress`, `select`, `number-input`, `alert`) | `/app/files` |
| `profile-01` (`ProfileForm`; `tags-input`, `password-input`, `input-group`, `textarea`) | `/app/settings` |
| `settings-01` (`SettingsForm`; `switch`, `radio-group`, `select`) | `/app/settings` |
| `sonner` (`Toaster`) | `/app/*` (save confirmations) |
| `onboarding-01` (`OnboardingFlow`; `stepper`, `checkbox`, `time-picker`) | `/welcome` |
| `button`, `avatar`, `breadcrumb`, `separator` (and the blocks' other ui deps) | across pages |

Studio's sample data (series, files, readers, settings) lives in `lib/studio-data.ts`; the
blocks' own `*-data.ts` samples stay installed and unused. Installed files are kept as shipped; workarounds are logged in [FINDINGS.md](FINDINGS.md).
Design notes: [DESIGN.md](DESIGN.md).

## Run

```bash
npm ci
npm run dev    # http://localhost:3000
npm run lint
npm run build
```
