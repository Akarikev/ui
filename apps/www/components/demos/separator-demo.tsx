import { Separator } from "@/components/ui/separator"

export function SeparatorDemo() {
  return (
    <div className="w-full max-w-sm rounded-md border border-border p-4">
      <p className="text-sm font-medium">Account</p>
      <p className="text-sm text-muted-foreground">Manage your profile and settings.</p>
      <Separator className="my-4" />
      <p className="text-sm text-muted-foreground">Security and billing options</p>
    </div>
  )
}
