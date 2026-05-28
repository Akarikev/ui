# Icons Rules

## Default library

Use **lucide-react** unless `iconLibrary` in project context specifies otherwise.

Check `npx elorm info --json` for the project's `iconLibrary` setting.

## data-icon on button icons

```tsx
// Correct
<Button>
  <SearchIcon data-icon="inline-start" />
  Search
</Button>

<Button>
  Next
  <ArrowRightIcon data-icon="inline-end" />
</Button>

// Wrong — no data-icon
<Button>
  <SearchIcon className="mr-2 h-4 w-4" />
  Search
</Button>
```

## No sizing classes inside components

When an icon is inside a Button or other component that handles sizing via CSS, do not add `size-4`, `w-4 h-4`, or similar.

```tsx
// Correct — component handles size
<Button>
  <PlusIcon data-icon="inline-start" />
  Add
</Button>

// Wrong
<Button>
  <PlusIcon className="size-4" data-icon="inline-start" />
  Add
</Button>
```

## Spinner for loading

```tsx
<Button disabled>
  <Spinner data-icon="inline-start" />
  Saving...
</Button>
```

## Pass icon components, not strings

```tsx
// Correct
<Button><CheckIcon data-icon="inline-start" />Done</Button>

// Wrong
<Button icon="check">Done</Button>
```
