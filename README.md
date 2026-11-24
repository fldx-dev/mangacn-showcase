# mangacn showcase

Example apps built with [mangacn](https://www.mangacn.com) components, installed from the public `@mangacn` shadcn registry.

| App | What it is |
|---|---|
| `reader/` | Inkwell: webcomic reader (library, series, chapter reader) |
| `studio/` | Studio: creator dashboard (auth, sidebar shell, charts, files, settings) |
| `portfolio/` | Manga artist portfolio and blog |
| `onepiece/` | Unofficial One Piece fan page (crew wanted posters, saga chart); series artwork not in repo |

Each app is standalone: `cd <app> && npm ci && npm run dev`. All content is original, except `onepiece/`, an unofficial fan page whose series artwork is not committed.
Each deploys as its own Vercel project with Root Directory set to the app folder.
