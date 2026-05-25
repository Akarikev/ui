## Learned User Preferences

- Brand as **elorm/ui** with lowercase `elorm` (mirroring shadcn/ui), not "Elorm UI" or capitalized "Elorm".
- Prefer **Bun** for local dev and monorepo scripts.
- Prefer **native Next.js docs** over Mintlify; chose **Fumadocs core with a custom shadcn-style minimal layout**.
- Docs layout should be minimal and beautiful, similar to shadcn/ui docs.
- Docs prose styles must not double-border code inside `.not-prose` components (e.g. `InstallCommand`).
- CLI should let users choose **Base UI or Radix UI** at init.
- Docs install snippets should cover **npm, pnpm, yarn, and bun**.
- Theme customization should be consolidated in one picker, not repeated across every demo section.
- Marketing site should use **Geist** fonts.
- GitHub repo should be a normal user repo named `elorm/ui`, not an organization.
- Component docs should include live preview and code examples.
- Elorm style rules: use `Field`/`FieldGroup` for forms, `gap-*` not `space-y-*`, icons in buttons use `data-icon`, semantic color tokens only, shared styles from `@/lib/ui-styles`.

## Learned Workspace Facts

- Turborepo monorepo: `apps/www` (Next.js marketing + native `/docs`), `packages/cli`, `packages/schema`, `packages/registry`, `packages/registry-radix`, `packages/themes`.
- Docs content lives in `apps/www/content/docs/` and is served at `/docs` via Fumadocs (migrated from Mintlify proxy).
- `scripts/generate-docs.ts` generates component MDX from `registry.json` into `apps/www/content/docs/components/`.
- Public site domain is **ui.elorm.xyz**.
- CLI config file is `elorm.json`; core commands are `init`, `add`, `search`, `docs`, and `build`.
- Dual headless registries: Base UI in `packages/registry`, Radix in `packages/registry-radix`.
- `apps/www` uses Next.js 16; run the site with `bun run --filter www dev`.
