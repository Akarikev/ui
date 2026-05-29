"use client"

import { Button } from "@/components/ui-heroui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui-heroui/sheet"

export function SheetDemoHeroUi() {
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
