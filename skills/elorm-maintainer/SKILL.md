---
name: elorm-maintainer
description: Guides elorm/ui monorepo contributors through registry changes, docs generation, CLI updates, and Fumadocs constraints. Use when editing packages/registry, packages/registry-radix, registry.json, scripts/generate-docs.ts, apps/www/content/docs, or apps/www/components/demos.
user-invocable: false
---

# elorm/ui Maintainer

For contributors working in the [Akarikev/ui](https://github.com/Akarikev/ui) monorepo.

## Architecture

| Path | Purpose |
| --- | --- |
| `packages/registry/` | Base UI component source (shared styled components) |
| `packages/registry-radix/` | Radix overrides for 9 primitives only |
| `packages/registry-heroui/` | HeroUI overrides for supported primitives |
| `packages/registry-nagomi/` | Explicit Nagomi source overrides (currently card/progress) |
| `packages/cli/` | `elorm` npm package |
| `packages/schema/` | Zod schemas for `elorm.json` and registry |
| `packages/themes/` | Theme presets and CSS generation |
| `apps/www/` | Marketing site, Fumadocs docs, registry hosting at `/public/r/` |
| `registry.json` | Root registry index |
| `scripts/generate-docs.ts` | Generates component MDX and demo code maps |

**Multi-library registries:** styled components are shared; only headless primitives differ. When changing a primitive-backed component, update Base UI plus Radix/HeroUI overrides if applicable.

**Nagomi beta:** `style: "nagomi"` builds to `apps/www/public/r/nagomi/{library}/{name}.json`. It uses explicit overrides in `packages/registry-nagomi/` and build-time source transforms in `packages/cli/src/commands/build.ts` for rounded beta styling. Keep stable output at `apps/www/public/r/{library}/{name}.json`.

## Registry workflow

```
1. Edit packages/registry/ (+ registry-radix/ and registry-heroui/ if primitive)
2. Update registry.json (title, description, registryDependencies, meta)
3. bun run registry:build        → apps/www/public/r/
4. bun run docs:generate         → MDX + docs-example-code.ts
5. bun run www:sync              → copy registry sources into apps/www
6. Add/update demo in apps/www/components/demos/
7. Wire demo in apps/www/components/preview/registry.tsx
8. Add slug to apps/www/content/docs/components/meta.json
```

Verify preview and code tabs on `/docs/components/<name>`.

For Nagomi-specific source styling, verify generated JSON under both stable and Nagomi paths:

```bash
apps/www/public/r/base-ui/{name}.json
apps/www/public/r/nagomi/base-ui/{name}.json
apps/www/public/r/nagomi/radix/{name}.json
apps/www/public/r/nagomi/heroui/{name}.json
```

## registry.json meta fields

Include for every component:

- `meta.usage` — one-line usage hint
- `meta.composition` — required subcomponents
- `meta.antiPatterns` — common mistakes
- `meta.examples` — titled code snippets
- `meta.docsLead` — markdown body with links (for docs generator)
- `meta.docsTitle` — optional linked page header

These feed `elorm docs <name> --json` and the agent skill.

## Fumadocs constraints

- Content: `apps/www/content/docs/`
- **Static component map** — don't nest custom tab children in MDX; use single registered components (e.g. `FrameworkSetup`)
- Prose must not **double-border code** inside `.not-prose` blocks (e.g. `InstallCommand`)
- Docs search API: `/api/search?query=` (not `q`)
- Mobile docs nav: **sheet menu**; hamburger is `lg:hidden`
- Component sidebar order: `apps/www/content/docs/components/meta.json`

## Elorm style rules (registry + demos)

- `Field` / `FieldGroup` for forms
- `gap-*` not `space-y-*` / `space-x-*`
- Icons in buttons: `data-icon`
- Semantic color tokens only
- Shared styles from `@/lib/ui-styles`
- Elorm soft identity: rounded surfaces, soft shadows
- Nagomi beta: rounder source styles for button, input, textarea, select, dialog, sheet, popover, dropdown-menu, badge, alert, empty-state, stat-card, card, progress, and slider
- Dialog/Sheet/AlertDialog demos start **closed** with explicit open trigger

## Local dev

```bash
bun install
bun run --filter www dev          # site at localhost:3000
bun run registry:build
bun run docs:generate
bun run typecheck && bun run test && bun run build
```

## Agent skills sync

When changing CLI commands/flags, registry meta fields, or elorm-specific style rules, update:

- `skills/elorm/SKILL.md` and linked reference files
- `skills/elorm/cli.md` for new CLI flags
- `skills/elorm/theming.md` for style/token changes
- Docs page at `/docs/get-started/agent-skills`

Install command for users: `npx skills add Akarikev/ui --skill elorm`

## Publish

```bash
bun run publish:cli:dry-run
bun run publish:cli
bun run publish:cli:all    # npm + GitHub release
```

Registry changes must land in `apps/www/public/r/` and deploy to Vercel (ui.elorm.xyz).
