# Contributing to elorm/ui

Thanks for helping improve elorm/ui. This guide covers what you need to know before opening a PR.

**Docs for end users:** [ui.elorm.xyz/docs](https://ui.elorm.xyz/docs)

## Need to know

Read these before changing components, docs, or the CLI.

### Branding

- Always **elorm/ui** with lowercase `elorm` (like shadcn/ui), not "Elorm UI".
- Public site: **ui.elorm.xyz**
- Registry JSON is served at `https://ui.elorm.xyz/r/{library}/{name}.json`

### Architecture

This is a **Turborepo monorepo** managed with **Bun**. Node **20+** is required.


| Path                       | Purpose                                                                            |
| -------------------------- | ---------------------------------------------------------------------------------- |
| `apps/www/`                | Next.js marketing site, Fumadocs docs at `/docs`, registry hosting at `/public/r/` |
| `packages/cli/`            | `elorm` npm package (CLI)                                                          |
| `packages/schema/`         | Zod schemas for `elorm.json` and registry types                                    |
| `packages/themes/`         | Theme presets and CSS generation                                                   |
| `packages/registry/`       | Base UI component source                                                           |
| `packages/registry-radix/` | Radix UI primitive source (headless layer only)                                    |
| `registry.json`            | Root registry index                                                                |
| `scripts/generate-docs.ts` | Generates component MDX and demo code maps                                         |


**Dual registries:** styled components are shared; only headless primitives differ between Base UI and Radix. When you change a primitive-backed component, update both registries if applicable.

### Elorm style rules

These apply to registry components and docs demos:

- Use **`Field` / `FieldGroup`** for forms, not ad-hoc label stacks
- Use **`gap-*`**, not `space-y-*` or `space-x-*`
- Icons in buttons use **`data-icon`**
- Use **semantic color tokens** only (`bg-primary`, `text-muted-foreground`) — no raw palette classes
- Shared styles live in **`@/lib/ui-styles`** (`packages/registry/lib/ui-styles.ts`)
- **elorm soft identity:** rounded surfaces and soft shadows — not stock Radix/Base UI defaults
- **Dialog / Sheet / Alert Dialog** demos start **closed** with an explicit open trigger; Cancel/Save/close must dismiss

### Docs site (Fumadocs)

- Content: `apps/www/content/docs/`
- Component sidebar order: `apps/www/content/docs/components/meta.json`
- Live previews: `apps/www/components/demos/` + `apps/www/components/preview/registry.tsx`
- Code tabs pull from generated `apps/www/lib/docs-example-code.ts` — run `bun run docs:generate` after registry or demo changes
- **Do not nest custom tab children in MDX** — Fumadocs uses a static component map. Use single registered components (e.g. `FrameworkSetup`)
- Prose must not **double-border code** inside `.not-prose` blocks (e.g. `InstallCommand`)
- Docs search API expects **`/api/search?query=`** (not `q`)
- Mobile docs nav uses a **sheet**; hamburger is **`lg:hidden`**

### Registry workflow

1. Add or edit source in `packages/registry/` (and `packages/registry-radix/` for primitives)
2. Add or update the item in **`registry.json`**
3. Run **`bun run registry:build`** — writes JSON to `apps/www/public/r/`
4. Run **`bun run docs:generate`** — refreshes MDX and example code
5. Sync www app copies if needed: **`bun run www:sync`**
6. Add or update a demo in `apps/www/components/demos/` and register it in the preview registry

Marketing catalog counts on the homepage come from **`apps/www/lib/registry-catalog.ts`** (derived from `registry.json`).

### CLI

- Published as **`elorm`** on npm; `@elorm/schema` and `@elorm/themes` are bundled into the CLI at build time
- Config file: **`elorm.json`** with `$schema` pointing to `https://ui.elorm.xyz/schema/elorm.json`
- Default registry URL: `https://ui.elorm.xyz/r/{library}/{name}.json`
- Install snippets in docs should cover **npm, pnpm, yarn, and bun**

## Local development

```bash
# Install
bun install

# Run docs + marketing site
bun run --filter www dev

# Full build (schema, themes, CLI, registry, docs, www)
bun run build

# Rebuild registry JSON only
bun run registry:build

# Regenerate component MDX
bun run docs:generate

# Run CLI tests
bun run --filter elorm test

# Typecheck all packages
bun run typecheck
```

Site runs at `http://localhost:3000`. Docs at `/docs`.

## Adding a component

1. **Implement** in `packages/registry/ui/<name>.tsx` (and Radix primitive if needed)
2. **Register** in `registry.json` with title, description, `registryDependencies`, and `meta.examples`
3. **Build registry:** `bun run registry:build`
4. **Demo:** create `apps/www/components/demos/<name>-demo.tsx` and wire it in `apps/www/components/preview/registry.tsx`
5. **Docs:** add the slug to `apps/www/content/docs/components/meta.json`, then `bun run docs:generate`
6. **Verify** preview and code tabs match on `/docs/components/<name>`

For **blocks**, source lives in `packages/registry/blocks/`.

## Pull requests

1. Fork and create a branch from `main`
2. Keep changes focused — one component or one concern per PR when possible
3. Run before opening:
   ```bash
   bun run typecheck
   bun run test
   bun run build
   ```
4. Include screenshots or a short note for visual changes (marketing, docs previews, component styling)
5. Describe what changed and why in the PR body

Bug fixes and docs improvements are always appreciated. For large features, open an issue first to discuss direction.

## Testing

- CLI unit tests: `packages/cli/src/utils/index.test.ts` (run via `bun run --filter elorm test`)
- CI (`.github/workflows/ci.yml`) runs `build`, `test`, and `typecheck` on push/PR to `main`

## Maintainers

### Publish CLI to npm

```bash
bun run publish:cli:dry-run   # inspect tarball
bun run publish:cli           # requires npm login
```

### Deploy website + registry

The site deploys from `apps/www` (Vercel). Custom domain: **ui.elorm.xyz**.

Every registry change must be built and deployed so `/r/*` stays in sync:

```bash
bun run registry:build
git add apps/www/public/r
git commit -m "Rebuild registry"
git push
```

`apps/www/vercel.json` runs the full monorepo build on deploy.

### JSON schemas

Public schemas served from the site:

- `apps/www/public/schema/elorm.json` — `elorm.json` config
- `apps/www/public/schema/registry.json` — registry index shape

Update these when config or registry schemas change in `@elorm/schema`.

## Questions

Open a [GitHub issue](https://github.com/Akarikev/ui/issues) for bugs, feature ideas, or questions before a large PR.