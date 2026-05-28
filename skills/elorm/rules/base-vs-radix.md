# Base UI vs Radix

Check `uiLibrary` from `npx elorm info --json`.

## Which components differ

Only **8 primitives** have Radix-specific source in `packages/registry-radix/`:

- button
- checkbox
- switch
- select
- dialog
- sheet
- dropdown-menu
- tooltip

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

## Choosing library

Set at init:

```bash
npx elorm init --ui-library base-ui   # default
npx elorm init --ui-library radix
```

Override per add:

```bash
npx elorm add -l radix button
```

## Registry URLs

- Base UI: `https://ui.elorm.xyz/r/base-ui/{name}.json`
- Radix: `https://ui.elorm.xyz/r/radix/{name}.json`

The `{library}` placeholder in registry templates matches `uiLibrary` from config.
