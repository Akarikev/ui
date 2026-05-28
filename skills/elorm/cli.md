# elorm CLI Reference

## Config discovery

The CLI reads config from (first match wins):

- `elorm.json`
- `.elormrc` / `.elormrc.json`
- `elorm.config.js`
- `package.json` (`elorm` key)

Schema: `https://ui.elorm.xyz/schema/elorm.json`

## Commands

### `elorm init`

Initialize elorm/ui in a project. Creates `elorm.json`, `cn()` util, and themed CSS.

| Flag | Description |
| --- | --- |
| `-y, --yes` | Skip prompts, use defaults |
| `-t, --template <next\|vite>` | Framework template |
| `--css <path>` | Global CSS file path |
| `--ui-library <base-ui\|radix>` | Headless primitive library |
| `--base-color <color>` | neutral, zinc, slate, stone, gray |
| `--accent <accent>` | default, mono, blue, violet, green, orange, rose, amber, cyan |
| `--radius <default\|compact\|round>` | Border radius preset |

Vite sets `rsc: false` automatically.

### `elorm add [items...]`

Add components or blocks from the registry.

| Flag | Description |
| --- | --- |
| `-o, --overwrite` | Overwrite existing files |
| `--dry-run` | Preview changes without writing |
| `-l, --library <base-ui\|radix>` | Override `uiLibrary` for this add |
| `-i, --interactive` | Choose UI library interactively |

**Side effects on add:**

- Resolves `registryDependencies` topologically (includes `utils`, `ui-styles`)
- Auto-installs npm `dependencies` from registry item
- Merges `cssVars` into global CSS
- Rewrites imports: `@/components/ui` → project `aliases.ui`, etc.
- Strips `@elorm/` prefix from item names

### `elorm search`

| Flag | Description |
| --- | --- |
| `-q, --query <query>` | Search registry by name/description |

### `elorm docs <item>`

| Flag | Description |
| --- | --- |
| `--json` | AI-friendly JSON with `meta.usage`, `meta.composition`, `meta.antiPatterns`, install commands for npm/pnpm/yarn/bun |

### `elorm info`

| Flag | Description |
| --- | --- |
| `--json` | Project config, aliases, installed components/blocks, resolved paths |

### `elorm diff <item>`

Compare local files in `aliases.ui` against registry version (basename match).

### `elorm build` (maintainers)

| Flag | Description |
| --- | --- |
| `-o, --output <dir>` | Output directory (default: `public/r`) |
| `-r, --registry <path>` | Registry index path (default: `registry.json`) |
| `-l, --library <base-ui\|radix\|all>` | Library variant to build |

## Registry URL resolution

- Bare name: `button` → `https://ui.elorm.xyz/r/{library}/button.json`
- Namespace: `@elorm/button` → uses `registries["@elorm"]` template
- Full URL: passed through unchanged
- `{library}` replaced with `uiLibrary`; `{name}` with item name

## Agent skill install

```bash
npx skills add Akarikev/ui --skill elorm -g -y
```
