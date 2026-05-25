"use client"

import Link from "next/link"
import type { TOCItemType } from "fumadocs-core/toc"
import { cn } from "@/lib/utils"

export function DocsToc({ toc }: { toc: TOCItemType[] }) {
  if (!toc.length) return null

  return (
    <aside className="hidden w-44 shrink-0 xl:block">
      <div className="sticky top-20 pb-8 pl-2">
        <p className="mb-3 text-xs font-medium text-foreground">On this page</p>
        <ul className="flex flex-col gap-2 text-xs">
          {toc.map((item) => (
            <li key={item.url}>
              <Link
                href={item.url}
                className={cn(
                  "block text-muted-foreground transition-colors hover:text-foreground",
                  item.depth === 3 && "pl-3",
                  item.depth >= 4 && "pl-6"
                )}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
