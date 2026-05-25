<p align="center">
  <a href="https://ui.elorm.xyz">
    <img src="https://raw.githubusercontent.com/Akarikev/ui/main/.github/icon.png" width="56" height="56" alt="elorm/ui logo" />
  </a>
</p>

<h1 align="center">elorm</h1>

<p align="center">
  CLI for <a href="https://ui.elorm.xyz">elorm/ui</a> — copy-paste React components on Base UI or Radix UI and Tailwind CSS v4.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/elorm"><img src="https://img.shields.io/npm/v/elorm?style=flat-square&color=000&logo=npm&logoColor=white" alt="npm version" /></a>
  <a href="https://ui.elorm.xyz/docs"><img src="https://img.shields.io/badge/docs-ui.elorm.xyz-000?style=flat-square" alt="Docs" /></a>
</p>

## Install

```bash
npx elorm init
```

Or install globally:

```bash
npm install -g elorm
elorm init
```

## Quick start

```bash
npx elorm init
npx elorm add button card dialog
npx elorm add login-form
```

## Commands

| Command | Description |
| --- | --- |
| `elorm init` | Initialize elorm/ui in your project |
| `elorm add [items...]` | Add components or blocks |
| `elorm search -q "query"` | Search the registry |
| `elorm docs <item> [--json]` | Show component documentation |
| `elorm diff <item>` | Compare local vs registry version |

## Options

`elorm init` supports non-interactive setup:

```bash
npx elorm init -y \
  --template next \
  --ui-library base-ui \
  --base-color neutral \
  --accent mono \
  --radius default
```

## Registry

Components are fetched from [ui.elorm.xyz/r/registry.json](https://ui.elorm.xyz/r/registry.json).

## Documentation

Full docs: [ui.elorm.xyz/docs](https://ui.elorm.xyz/docs)

## License

MIT
