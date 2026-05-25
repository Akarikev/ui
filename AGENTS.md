## Learned User Preferences

- Brand and GitHub repo as **elorm/ui** with lowercase `elorm` (mirroring shadcn/ui), as a normal user repo not an organization.
- Prefer **Bun** for local dev and monorepo scripts.
- Prefer **native Next.js docs** over Mintlify; chose **Fumadocs core with a custom shadcn-style minimal layout**.
- Docs layout is minimal and shadcn-like, with understated headings and icons; prose must not double-border code inside `.not-prose` components (e.g. `InstallCommand`).
- CLI should let users choose **Base UI or Radix UI** at init.
- Docs install snippets should cover **npm, pnpm, yarn, and bun**.
- Theme customization should be consolidated in one picker, not repeated across every demo section; marketing site defaults to **neutral** base and **mono** accent.
- Marketing site should use **Geist** fonts; header nav links should be **bold** (`font-semibold`).
- Component docs should include live preview and per-variant copy-paste code (shadcn-style); interactive demos start closed with an explicit open trigger.
- Elorm style rules: use `Field`/`FieldGroup` for forms, `gap-*` not `space-y-*`, icons in buttons use `data-icon`, semantic color tokens only, shared styles from `@/lib/ui-styles`; customize components with an **elorm soft identity** (rounded surfaces, soft shadows) rather than stock Radix/Base UI defaults.
- Docs mobile navigation uses a **sheet menu** (hamburger); hide it on `**lg+`** desktop.

## Learned Workspace Facts

- Turborepo monorepo: `apps/www` (Next.js marketing + native `/docs`), `packages/cli`, `packages/schema`, `packages/registry`, `packages/registry-radix`, `packages/themes`.
- Docs content lives in `apps/www/content/docs/` and is served at `/docs` via Fumadocs (migrated from Mintlify proxy).
- `scripts/generate-docs.ts` generates component MDX from `registry.json`; marketing catalog counts come from `apps/www/lib/registry-catalog.ts`.
- Public site domain is **ui.elorm.xyz**.
- CLI config file is `elorm.json`; core commands are `init`, `add`, `search`, `docs`, and `build`.
- Dual headless registries: Base UI in `packages/registry`, Radix in `packages/registry-radix`.
- `apps/www` uses Next.js 16; run the site with `bun run --filter www dev`.
- Shared styling tokens live in `packages/registry/lib/ui-styles.ts` (mirrored in `apps/www/lib/ui-styles.ts`).
- Registry includes `social-links` for configurable social icon link rows (github, x, mastodon, bluesky, reddit, discord).
- Fumadocs MDX uses a static component map — don't nest custom tab children in MDX; use single registered components (e.g. `FrameworkSetup`).
- Docs search calls `/api/search?query=`; framework logos are local `NextMark`/`ViteLogo` in `framework-logos.tsx` (npm `geist` has no logos export).
- Hero background images use a fixed-height container and `unoptimized` Next/Image to avoid stretch blur on resize.