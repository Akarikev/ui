# elorm/ui

Beautiful, copy-paste React components built on [Base UI](https://base-ui.com) or [Radix UI](https://radix-ui.com) and [Tailwind CSS v4](https://tailwindcss.com). You add components to your project with the CLI — you own every line of code.

**Website & docs:** [ui.elorm.xyz](https://ui.elorm.xyz) · **CLI on npm:** [`elorm`](https://www.npmjs.com/package/elorm)

## Why elorm/ui

- **Copy-paste, not a black-box dependency** — customize freely in your codebase
- **Base UI or Radix** — pick your headless library at init
- **Tailwind v4 + OKLCH tokens** — theme presets for base color, accent, and radius
- **32 components + 6 blocks** — forms, overlays, data display, and ready-made page sections
- **AI-friendly CLI** — `elorm docs button --json` for structured metadata

## Quick start

```bash
npx elorm init
npx elorm add button card dialog
```

Non-interactive init:

```bash
npx elorm init -y --template next --ui-library base-ui --base-color neutral --accent mono
```

Read the full guide at [ui.elorm.xyz/docs/get-started/installation](https://ui.elorm.xyz/docs/get-started/installation).

## Documentation

User-facing docs live on the site, not in this repo's README.

| Topic | Link |
| --- | --- |
| Installation | [docs/get-started/installation](https://ui.elorm.xyz/docs/get-started/installation) |
| CLI reference | [docs/get-started/cli](https://ui.elorm.xyz/docs/get-started/cli) |
| Components | [docs/components/button](https://ui.elorm.xyz/docs/components/button) |
| Theming | [docs/get-started/theming](https://ui.elorm.xyz/docs/get-started/theming) |

## Contributing

Contributions are welcome. See **[CONTRIBUTING.md](./CONTRIBUTING.md)** for local setup, project layout, style rules, and how to add components or update docs.

## License

MIT — see [LICENSE](./LICENSE).
