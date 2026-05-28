<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset=".github/icon.svg" />
    <source media="(prefers-color-scheme: light)" srcset=".github/icon-light.svg" />
    <img src=".github/icon.png" width="72" height="72" alt="elorm/ui logo" />
  </picture>
</p>

<h1 align="center">elorm/ui</h1>

<p align="center">
  Beautiful, copy-paste React components built on Base UI or Radix UI and Tailwind CSS v4.
  <br />
  Add components to your project with the CLI — you own every line of code.
</p>

<p align="center">
  <a href="https://ui.elorm.xyz"><img src="https://img.shields.io/badge/docs-ui.elorm.xyz-000?style=for-the-badge" alt="Docs" /></a>
  <a href="https://www.npmjs.com/package/elorm"><img src="https://img.shields.io/npm/v/elorm?style=for-the-badge&color=000&logo=npm&logoColor=white" alt="npm version" /></a>
  <a href="https://skills.sh"><img src="https://img.shields.io/badge/agent_skills-npx_skills_add-000?style=for-the-badge" alt="Agent Skills" /></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-MIT-000?style=for-the-badge" alt="License" /></a>
</p>

<p align="center">
  <a href="https://ui.elorm.xyz">Website</a>
  ·
  <a href="https://ui.elorm.xyz/docs">Documentation</a>
  ·
  <a href="https://www.npmjs.com/package/elorm">npm</a>
  ·
  <a href="https://ui.elorm.xyz/docs/get-started/agent-skills">Agent Skills</a>
  ·
  <a href="./CONTRIBUTING.md">Contributing</a>
</p>

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

## Why elorm/ui

- **Copy-paste, not a black-box dependency** — customize freely in your codebase
- **Base UI or Radix** — pick your headless library at init
- **Tailwind v4 + OKLCH tokens** — theme presets for base color, accent, and radius
- **32 components + 6 blocks** — forms, overlays, data display, and ready-made page sections
- **AI-friendly CLI** — `elorm docs button --json` for structured metadata

## Documentation

| Topic | Link |
| --- | --- |
| Installation | [docs/get-started/installation](https://ui.elorm.xyz/docs/get-started/installation) |
| CLI reference | [docs/get-started/cli](https://ui.elorm.xyz/docs/get-started/cli) |
| Agent skills | [docs/get-started/agent-skills](https://ui.elorm.xyz/docs/get-started/agent-skills) |
| Components | [docs/components/button](https://ui.elorm.xyz/docs/components/button) |
| Theming | [docs/get-started/theming](https://ui.elorm.xyz/docs/get-started/theming) |

## Contributing

Contributions are welcome. See **[CONTRIBUTING.md](./CONTRIBUTING.md)** for local setup, project layout, style rules, and how to add components or update docs.

## License

MIT — see [LICENSE](./LICENSE).
