# Styling Rules

## Semantic colors only

```tsx
// Correct
<div className="bg-background text-foreground" />
<Badge variant="secondary">+20%</Badge>

// Wrong
<div className="bg-white text-gray-900 dark:bg-gray-950" />
<span className="text-emerald-600">+20%</span>
```

## className for layout, not styling

Use `className` for spacing, sizing, flex/grid — not to override component colors or typography.

```tsx
// Correct — layout only
<Button className="w-full">Submit</Button>

// Wrong — overriding component styling
<Button className="bg-purple-600 hover:bg-purple-700">Submit</Button>
```

## Spacing: gap-*, not space-*

```tsx
// Correct
<div className="flex flex-col gap-4">...</div>
<div className="flex items-center gap-2">...</div>

// Wrong
<div className="space-y-4">...</div>
<div className="space-x-2">...</div>
```

## Equal dimensions: size-*

```tsx
// Correct
<Avatar className="size-10" />

// Wrong
<Avatar className="h-10 w-10" />
```

## cn() for conditional classes

```tsx
import { cn } from "@/lib/utils"

<div className={cn("flex gap-2", isActive && "ring-2")} />
```

## ui-styles shared exports

Import from `@/lib/ui-styles` (added via `registryDependencies`):

| Export | Use for |
| --- | --- |
| `softRadius` | Rounded surfaces (`rounded-xl`) |
| `softShadow` | Soft elevation shadows |
| `surfaceSoft` | Muted card/surface backgrounds |
| `surfaceSoftHover` | Hover state on soft surfaces |
| `pressable` | Button press scale animation |
| `focusRing` | Consistent focus rings |
| `transitionBase` | 150ms color/border transitions |
| `overlayBackdrop` | Dialog/sheet backdrop |
| `popoverSurface` | Popover/dropdown surfaces |
| `menuItemBase` | Menu item styling |
| `surfaceInput` | Input field surfaces |

## Elorm soft identity

Components use rounded surfaces and soft shadows — not stock Radix/Base UI defaults. Prefer component variants (`soft`, `soft-outline`, `size="soft"`) over custom styling.

## Dark mode

Semantic tokens handle dark mode automatically. Do not add manual `dark:` color overrides.
