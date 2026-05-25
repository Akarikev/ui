"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { MenuIcon } from "lucide-react"
import type * as PageTree from "fumadocs-core/page-tree"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { DocsSidebarNav } from "@/components/docs/docs-sidebar"
import { cn } from "@/lib/utils"

export function DocsMobileNav({
  tree,
  className,
}: {
  tree: PageTree.Root
  className?: string
}) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className={cn(
          "inline-flex size-9 items-center justify-center rounded-lg border border-border bg-card/60 text-muted-foreground transition-colors hover:bg-card hover:text-foreground",
          className
        )}
        aria-label="Open docs menu"
      >
        <MenuIcon className="size-4" />
      </SheetTrigger>
      <SheetContent side="left" className="w-[min(100vw-2rem,20rem)] gap-0 p-0">
        <SheetHeader className="border-b border-border px-4 py-4 text-left">
          <SheetTitle className="text-base font-semibold">
            Documentation
          </SheetTitle>
        </SheetHeader>
        <nav className="max-h-[calc(100dvh-5rem)] overflow-y-auto px-3 py-4">
          <DocsSidebarNav
            tree={tree}
            onNavigate={() => setOpen(false)}
          />
        </nav>
        <div className="border-t border-border px-4 py-3">
          <Link
            href="/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Back to home
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}
