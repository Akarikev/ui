# Forms Rules

## FieldGroup + Field

Never use raw `div` with labels stacked via `space-y-*`.

```tsx
// Correct
<FieldGroup>
  <Field>
    <FieldLabel htmlFor="email">Email</FieldLabel>
    <Input id="email" type="email" />
    <FieldDescription>We'll never share your email.</FieldDescription>
  </Field>
  <Field>
    <FieldLabel htmlFor="password">Password</FieldLabel>
    <Input id="password" type="password" />
  </Field>
</FieldGroup>

// Wrong
<div className="space-y-4">
  <Label htmlFor="email">Email</Label>
  <Input id="email" />
</div>
```

## Validation states

```tsx
<Field data-invalid>
  <FieldLabel htmlFor="email">Email</FieldLabel>
  <Input id="email" aria-invalid />
  <FieldError>Invalid email address.</FieldError>
</Field>
```

- `data-invalid` on `Field`
- `aria-invalid` on the control
- `FieldError` for error message text
- `data-disabled` on `Field`, `disabled` on control when disabled

## InputGroup composition

Use `InputGroupInput` / `InputGroupTextarea` — not raw `Input` / `Textarea` inside `InputGroup`.

```tsx
// Correct
<InputGroup>
  <InputGroupAddon><SearchIcon /></InputGroupAddon>
  <InputGroupInput placeholder="Search..." />
</InputGroup>

// Wrong
<InputGroup>
  <Input placeholder="Search..." />
</InputGroup>
```

Buttons inside inputs: `InputGroup` + `InputGroupAddon`.

## Select composition

```tsx
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Choose..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="a">Option A</SelectItem>
    <SelectItem value="b">Option B</SelectItem>
  </SelectContent>
</Select>
```

Select inside Dialog: set `modal={false}` on Select (elorm default). Positioner needs `z-[100]` when stacking.
