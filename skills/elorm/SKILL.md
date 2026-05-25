---

## name: elorm

description: Manages elorm/ui components and projects — adding, searching, fixing, debugging, styling, and composing UI. Provides project context, component docs, and usage examples. Applies when working with elorm/ui, component registries, or any project with an elorm.json file.
user-invocable: false

# elorm/ui

A copy-paste component library for React. Components are added as source code to the user's project via the CLI.

> Run all CLI commands using the project's package runner: `npx elorm`, `bunx elorm`, or `pnpm dlx elorm`.

## Principles

1. **Use existing components first.** Check the elorm/ui registry before writing custom UI.
2. **Compose, don't reinvent.** Settings page = Tabs + Card + form controls.
3. **Use built-in variants before custom styles.** `variant="outline"`, `size="sm"`, etc.
4. **Use semantic colors.** `bg-primary`, `text-muted-foreground` — never raw values like `bg-blue-500`.

## Critical Rules

### Styling & Tailwind

- `**className` for layout, not styling.** Never override component colors or typography.
- *No `space-x-` or `space-y-`*.** Use `flex` with `gap-`*.
- *Use `size-` when width and height are equal.**
- **No manual `dark:` color overrides.** Use semantic tokens.
- **Use `cn()` for conditional classes.**

### Component Structure

- **Dialog and Sheet always need a Title.** Required for accessibility.
- **Use full Card composition.** CardHeader/CardTitle/CardDescription/CardContent/CardFooter.
- **SelectItem must be inside SelectContent.** SelectValue inside SelectTrigger.

### Icons

- **Use lucide-react by default** unless elorm.json specifies otherwise.
- **No sizing classes on icons inside components** when the component handles sizing.

## CLI Reference

```bash
# Initialize a project
npx elorm init

# Add components
npx elorm add button card dialog
npx elorm add @elorm/empty-state

# Search registry
npx elorm search -q "dialog"

# Get docs (AI-friendly JSON)
npx elorm docs button --json

# Compare local vs registry
npx elorm diff button

# Build registry (for maintainers)
npx elorm build
```

## Component Selection


| Need          | Use                                                          |
| ------------- | ------------------------------------------------------------ |
| Button/action | `Button` with appropriate variant                            |
| Form inputs   | `Input`, `Select`, `Switch`, `Checkbox`, `Textarea`, `Label` |
| Data display  | `Card`, `Badge`, `Skeleton`                                  |
| Overlays      | `Dialog`, `Sheet`, `DropdownMenu`, `Tooltip`                 |
| Layout        | `Card`, `Separator`, `PageHeader`                            |
| Empty states  | `EmptyState`                                                 |
| Dashboard     | `StatCard`, `PageHeader`                                     |


## Key Fields in elorm.json

- `**aliases**` → use the actual alias prefix for imports (e.g. `@/`, `~/`)
- `**rsc**` → when `true`, client components need `"use client"`
- `**tailwind.css**` → global CSS file where tokens are defined
- `**registries**` → URL templates for fetching components

## Workflow

1. Check if `elorm.json` exists — if not, run `npx elorm init`
2. Search for components: `npx elorm search -q "..."`
3. Get docs: `npx elorm docs <component> --json`
4. Add components: `npx elorm add <component>`
5. Review added files for correct imports matching project aliases