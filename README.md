# elorm/ui

Beautifully designed components built with [Base UI](https://base-ui.com) and [Tailwind CSS](https://tailwindcss.com). Copy and paste into your apps. Open Source. You own the code.

## Features

- **Copy-paste components** — not an npm dependency. You own every line of code.
- **Base UI primitives** — accessible, unstyled React components.
- **Tailwind CSS v4** — OKLCH color tokens, CSS-first configuration.
- **Custom CLI** — `npx elorm add button` installs components into your project.
- **AI-first DX** — `elorm docs button --json` for agent-friendly metadata.

## Quick Start

```bash
# Initialize elorm/ui in your project
npx elorm init

# Add components
npx elorm add button
npx elorm add card dialog
npx elorm add empty-state
```

## Documentation

Visit [ui.elorm.xyz](https://ui.elorm.xyz) for the marketing site and [ui.elorm.xyz/docs](https://ui.elorm.xyz/docs) for documentation.

## Mintlify Docs Setup

1. Create a project at [dashboard.mintlify.com](https://dashboard.mintlify.com)
2. Connect this repo with docs path `/docs`
3. Enable **Host at `/docs`** in Mintlify custom domain settings
4. Set `MINTLIFY_DOCS_URL` in Vercel to your Mintlify subdomain (see `apps/www/.env.example`)

## CLI Commands


| Command                      | Description                         |
| ---------------------------- | ----------------------------------- |
| `elorm init`                 | Initialize elorm/ui in your project |
| `elorm add [items...]`       | Add components to your project      |
| `elorm search -q "query"`    | Search the registry                 |
| `elorm docs <item> [--json]` | Show component documentation        |
| `elorm diff <item>`          | Compare local vs registry           |
| `elorm build`                | Build registry JSON (maintainers)   |


## Project Structure

```
elorm/
├── apps/www/           # Documentation site + registry hosting
├── packages/cli/       # elorm CLI (npm package)
├── packages/schema/      # Zod schemas for config + registry
├── packages/registry/    # Component source files
└── registry.json         # Registry index
```

## Development

This monorepo uses [Bun](https://bun.sh) for package management and scripts.

```bash
# Install dependencies
bun install

# Build all packages
bun run build

# Run docs site
bun run --filter 'www' dev

# Build registry JSON
bun run registry:build

# Run CLI tests
bun run --filter 'elorm' test
```

## Adding Components

Components live in `packages/registry/`. Add an entry to `registry.json`, then run:

```bash
bun run registry:build
```

## License

MIT