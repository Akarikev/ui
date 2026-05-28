---
name: elorm
description: Manages elorm/ui components and projects — adding, searching, fixing, debugging, styling, and composing UI. Provides project context, component docs, and usage examples. Applies when working with elorm/ui, component registries, or any project with an elorm.json file.
user-invocable: false
allowed-tools: Bash(npx elorm *), Bash(bunx elorm *), Bash(pnpm dlx elorm *)
---

# elorm/ui

A copy-paste component library for React. Components are added as source code to the user's project via the CLI.

> **IMPORTANT:** Run all CLI commands using the project's package runner: `npx elorm`, `bunx elorm`, or `pnpm dlx elorm`.

## Current Project Context

```json
!`npx elorm info --json`
```

Use `npx elorm docs <component> --json` for per-component metadata, usage, composition, and anti-patterns.

## Principles

1. **Use existing components first.** Run `npx elorm search -q "..."` before writing custom UI.
2. **Compose, don't reinvent.** Settings page = Tabs + Card + form controls.
3. **Use built-in variants before custom styles.** `variant="outline"`, `size="sm"`, etc.
4. **Use semantic colors.** `bg-primary`, `text-muted-foreground` — never raw values like `bg-blue-500`.

## Critical Rules

These rules are **always enforced**. Each links to a file with Incorrect/Correct code pairs.

### Styling & Tailwind → [rules/styling.md](./rules/styling.md)

- **`className` for layout, not styling.** Never override component colors or typography.
- **No `space-x-*` or `space-y-*`.** Use `flex` with `gap-*`.
- **Use `size-*` when width and height are equal.**
- **No manual `dark:` color overrides.** Use semantic tokens.
- **Use `cn()` for conditional classes.**
- **Shared styles from `@/lib/ui-styles`.** Use `softRadius`, `softShadow`, `surfaceSoft`, `pressable` — not ad-hoc classes.

### Forms & Inputs → [rules/forms.md](./rules/forms.md)

- **Forms use `FieldGroup` + `Field`.** Never raw `div` with `space-y-*` for form layout.
- **`InputGroup` uses `InputGroupInput`/`InputGroupTextarea`.** Never raw `Input`/`Textarea` inside `InputGroup`.
- **Field validation uses `data-invalid` + `aria-invalid`.** `data-invalid` on `Field`, `aria-invalid` on the control.

### Component Structure → [rules/composition.md](./rules/composition.md)

- **Dialog and Sheet always need a Title.** Required for accessibility.
- **Use full Card composition.** CardHeader/CardTitle/CardDescription/CardContent/CardFooter.
- **SelectItem must be inside SelectContent.** SelectValue inside SelectTrigger.
- **Select inside Dialog:** `modal={false}` on Select; positioner needs higher z-index.

### Icons → [rules/icons.md](./rules/icons.md)

- **Icons in `Button` use `data-icon`.** `data-icon="inline-start"` or `data-icon="inline-end"`.
- **No sizing classes on icons inside components** when the component handles sizing.
- **Use lucide-react by default** unless `elorm.json` specifies another `iconLibrary`.

### Base UI vs Radix → [rules/base-vs-radix.md](./rules/base-vs-radix.md)

- Check `uiLibrary` from project context (`base-ui` or `radix`).
- Only **8 primitives** differ between libraries: button, checkbox, switch, select, dialog, sheet, dropdown-menu, tooltip.
- Base UI triggers use `render={<Button>…</Button>}`; Radix uses `asChild`.

## Key Patterns

```tsx
// Form layout: FieldGroup + Field, not div + Label.
<FieldGroup>
  <Field>
    <FieldLabel htmlFor="email">Email</FieldLabel>
    <Input id="email" />
  </Field>
</FieldGroup>

// Icons in buttons: data-icon, no sizing classes.
<Button>
  <SearchIcon data-icon="inline-start" />
  Search
</Button>

// Loading: Spinner + disabled — no built-in loading prop.
<Button disabled>
  <Spinner data-icon="inline-start" />
  Saving...
</Button>

// Spacing: gap-*, not space-y-*.
<div className="flex flex-col gap-4">  // correct
<div className="space-y-4">           // wrong
```

## Component Selection

| Need | Use |
| --- | --- |
| Button/action | `Button` with appropriate variant (`soft`, `soft-outline`, `size="soft"`) |
| Form inputs | `Input`, `Select`, `Switch`, `Checkbox`, `Textarea`, `Label`, `Field` |
| Data display | `Card`, `Badge`, `Skeleton`, `StatCard` |
| Overlays | `Dialog`, `Sheet`, `DropdownMenu`, `Tooltip`, `AlertDialog` |
| Layout | `Card`, `Separator`, `PageHeader` |
| Empty states | `EmptyState` block (`elorm add empty-state`) |
| Dashboard | `StatCard`, `PageHeader`, `DataTable` block |
| Social links | `SocialLinks` (github, x, mastodon, bluesky, reddit, discord) |

## Registry Model

- **UI components** → `aliases.ui` (e.g. `@/components/ui/button.tsx`)
- **Blocks** → `aliases.components/blocks/` (e.g. `empty-state`, `login-form`)
- **Lib files** → `utils`, `ui-styles` via `registryDependencies`
- **Themes** → `elorm add theme-neutral` etc.
- Registry JSON: `https://ui.elorm.xyz/r/{library}/{name}.json`

## Key Fields

From project context (`npx elorm info --json`):

- **`aliases`** → use the actual alias prefix for imports (e.g. `@/`, `~/`) — never hardcode defaults
- **`rsc`** → when `true`, client components need `"use client"`
- **`uiLibrary`** → `base-ui` or `radix` — affects trigger APIs on 8 primitives
- **`tailwind.css`** → global CSS file where tokens are defined — edit this file, never create a new one
- **`iconLibrary`** → determines icon import package
- **`installedComponents`** → check before running `add`; don't import uninstalled components
- **`registries`** → URL templates for fetching components

## Workflow

1. **Get project context** — injected above. Run `npx elorm info --json` again if needed.
2. **Check installed components** — use `installedComponents` from context before `add`.
3. **Find components** — `npx elorm search -q "..."`.
4. **Get docs** — **always** run `npx elorm docs <component> --json` before implementing or fixing a component.
5. **Install** — `npx elorm add <component>`. Use `--dry-run` to preview.
6. **Review added files** — verify imports match project aliases; fix composition per Critical Rules.
7. **Compare updates** — `npx elorm diff <component>` before overwriting local changes.

## Quick Reference

```bash
# Initialize
npx elorm init
npx elorm init -y --template next --ui-library base-ui --base-color neutral --accent mono

# Add components and blocks
npx elorm add button card dialog
npx elorm add empty-state login-form
npx elorm add -l radix button   # override library for this add

# Search and docs
npx elorm search -q "dialog"
npx elorm docs button --json
npx elorm info --json

# Compare local vs registry
npx elorm diff button
npx elorm add button --dry-run
```

## Detailed References

- [cli.md](./cli.md) — Commands, flags, config discovery, alias rewriting
- [theming.md](./theming.md) — Presets, tokens, theme registry items
- [rules/styling.md](./rules/styling.md) — Semantic colors, ui-styles, soft identity
- [rules/forms.md](./rules/forms.md) — FieldGroup, Field, InputGroup, validation
- [rules/composition.md](./rules/composition.md) — Card, Dialog, Select, overlays
- [rules/icons.md](./rules/icons.md) — data-icon, Spinner loading buttons
- [rules/base-vs-radix.md](./rules/base-vs-radix.md) — render vs asChild, primitive split
