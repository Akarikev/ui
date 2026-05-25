import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

function LoginForm({
  className,
  onSubmit,
  ...props
}: React.ComponentProps<"form"> & {
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void
}) {
  return (
    <Card data-slot="login-form" className={cn("w-full max-w-sm", className)}>
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Sign in to your account to continue.</CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit} {...props}>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" type="email" placeholder="you@example.com" />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" type="password" />
              <FieldDescription>Must be at least 8 characters.</FieldDescription>
            </Field>
          </FieldGroup>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Sign in
          </Button>
          <Button type="button" variant="ghost" className="w-full">
            Create an account
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export { LoginForm }
