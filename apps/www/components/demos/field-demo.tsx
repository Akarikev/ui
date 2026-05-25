"use client"

import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function FieldDemo() {
  return (
    <FieldGroup className="max-w-sm">
      <Field>
        <FieldLabel htmlFor="name">Name</FieldLabel>
        <Input id="name" placeholder="Jane Doe" />
      </Field>
      <Field data-invalid>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input id="email" aria-invalid placeholder="invalid-email" />
        <FieldDescription>Enter a valid email address.</FieldDescription>
      </Field>
    </FieldGroup>
  )
}
