# elorm

CLI for [elorm/ui](https://ui.elorm.xyz) — a copy-paste React component library built on Base UI or Radix UI and Tailwind CSS v4.

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
# Initialize in your project
npx elorm init

# Add components
npx elorm add button
npx elorm add card dialog
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

Components are fetched from the public registry at [ui.elorm.xyz/r/registry.json](https://ui.elorm.xyz/r/registry.json).

## Documentation

Full docs: [ui.elorm.xyz/docs](https://ui.elorm.xyz/docs)

## License

MIT
