# Composition Rules

## Card — full structure

```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>{/* main content */}</CardContent>
  <CardFooter>{/* actions */}</CardFooter>
</Card>
```

Don't dump everything in `CardContent` without header/footer.

## Overlays — always include Title

Dialog, Sheet, and AlertDialog require a Title for accessibility. Use `className="sr-only"` if visually hidden.

```tsx
<Dialog>
  <DialogTrigger render={<Button>Open</Button>} />
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Settings</DialogTitle>
      <DialogDescription>Manage your account.</DialogDescription>
    </DialogHeader>
    {/* content */}
  </DialogContent>
</Dialog>
```

## Overlay demos start closed

Interactive demos must start **closed** with an explicit open trigger. Cancel/Save/close must dismiss the overlay.

## Button loading

No built-in `isLoading` prop. Compose with `Spinner` + `disabled`:

```tsx
<Button disabled>
  <Spinner data-icon="inline-start" />
  Saving...
</Button>
```

## Use components, not custom markup

| Need | Use | Not |
| --- | --- | --- |
| Separator | `<Separator />` | `<hr>` or `border-t` div |
| Loading | `<Skeleton />` | custom `animate-pulse` div |
| Badge | `<Badge variant="...">` | styled `<span>` |
| Empty state | `<EmptyState />` block | custom empty div |

## data-slot convention

Subcomponents use `data-slot` attributes for styling hooks. Don't remove them when customizing.

## Blocks vs UI components

Blocks install to `components/blocks/`:

```bash
npx elorm add empty-state
npx elorm add login-form
npx elorm add data-table
```

Import from blocks path, not `components/ui/`.
