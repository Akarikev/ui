# Base UI vs Radix vs HeroUI

Check `uiLibrary` from `npx elorm info --json`.

## Which components differ

Only **8 primitives** have library-specific source:

- button
- checkbox
- switch
- select
- dialog
- sheet
- dropdown-menu
- tooltip

| Library | Source package |
|---------|----------------|
| Base UI (default) | `packages/registry/` |
| Radix | `packages/registry-radix/` |
| HeroUI | `packages/registry-heroui/` |

All other styled components are **shared** between libraries. Only the headless layer differs.

## Trigger pattern

### Base UI (default) — `render` prop

```tsx
<DialogTrigger render={<Button variant="outline">Open</Button>} />

<DropdownMenuTrigger render={<Button variant="ghost">Menu</Button>} />
```

### Radix — `asChild`

```tsx
<DialogTrigger asChild>
  <Button variant="outline">Open</Button>
</DialogTrigger>

<DropdownMenuTrigger asChild>
  <Button variant="ghost">Menu</Button>
</DropdownMenuTrigger>
```

### HeroUI — compound triggers

HeroUI wrappers keep elorm's flat API. Triggers follow HeroUI/React Aria patterns internally; use the same elorm component names as Base UI.

```tsx
<Dialog>
  <DialogTrigger>
    <Button variant="outline">Open</Button>
  </DialogTrigger>
  <DialogContent>...</DialogContent>
</Dialog>
```

HeroUI init adds `@import "@heroui/styles"` to your global CSS after Tailwind.

## Choosing library

Set at init:

```bash
npx elorm init --ui-library base-ui   # default
npx elorm init --ui-library radix
npx elorm init --ui-library heroui
```

Override per add:

```bash
npx elorm add -l radix button
npx elorm add -l heroui dialog
```

## Registry URLs

- Base UI: `https://ui.elorm.xyz/r/base-ui/{name}.json`
- Radix: `https://ui.elorm.xyz/r/radix/{name}.json`
- HeroUI: `https://ui.elorm.xyz/r/heroui/{name}.json`

The `{library}` placeholder in registry templates matches `uiLibrary` from config.
