"use client"

import { Button } from "@/components/ui-radix/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui-radix/sheet"

export function SheetDemoRadix() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Share document</SheetTitle>
          <SheetDescription>
            Invite teammates or copy a private link to collaborate.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
