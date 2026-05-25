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

Docs are built into the Next.js app at `/docs` using [Fumadocs](https://fumadocs.dev). Content lives in `apps/www/content/docs/`.

Visit [ui.elorm.xyz/docs](https://ui.elorm.xyz/docs) for documentation.

```bash
# Run the site (marketing + docs)
bun run --filter 'www' dev

# Regenerate component docs from registry.json
bun run docs:generate
```

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