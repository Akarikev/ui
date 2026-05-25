"use client"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger>
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
