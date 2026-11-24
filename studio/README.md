# Studio

A demo creator dashboard for a made-up manga studio, built with
[mangacn](https://www.mangacn.com) components from the `@mangacn` shadcn registry. All names and
content are invented. Auth is fake: any email and password log in.

## Routes

| Route | What |
|---|---|
| `/` | Small landing page, links to log in and sign up |
| `/login`, `/signup` | Split-screen auth forms; any input sets a session cookie |
| `/app` | Sidebar shell with an Overview placeholder (redirects to `/login` without the cookie) |
| `/app/files`, `/app/settings` | Placeholder sections |

## mangacn items

| Item | Used on |
|---|---|
| `theme`, `theme-blueline` | Every page (site theme) |
| `login-02` (`LoginForm`) | `/login` |
| `signup-02` (`SignupForm`) | `/signup` |
| `sidebar-08` (`ui/sidebar`, `NavSecondary`, header pattern) | `/app/*` |
| `manga-frame`, `halftone-background`, `focus-lines`, `sfx-text` | `/`, `/login`, `/signup` |
| `panel` | `/`, `/forgot-password`, `/app/*` |
| `button`, `avatar`, `breadcrumb`, `separator` (and the blocks' other ui deps) | across pages |

Installed files are kept as shipped; workarounds are logged in [FINDINGS.md](FINDINGS.md).
Design notes: [DESIGN.md](DESIGN.md).

## Run

```bash
npm ci
npm run dev    # http://localhost:3000
npm run lint
npm run build
```
