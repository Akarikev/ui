"use client"

import { useEffect, useRef, useState } from "react"
import { SearchIcon } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface SearchResult {
  id: string
  url: string
  content?: string
  type: string
}

export function DocsSearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen(true)
      }
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const controller = new AbortController()
    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
          signal: controller.signal,
        })
        if (!res.ok) return
        const data = (await res.json()) as SearchResult[]
        setResults(data)
      } catch {
        /* ignore abort */
      }
    }, 200)

    return () => {
      clearTimeout(timeout)
      controller.abort()
    }
  }, [query])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden items-center gap-2 rounded-lg border border-border bg-muted/30 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground md:flex"
      >
        <SearchIcon className="size-4" />
        <span>Search docs...</span>
        <kbd className="ml-4 rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px]">
          ⌘K
        </kbd>
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="mx-auto mt-[15vh] w-full max-w-lg px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
              <div className="flex items-center gap-2 border-b border-border px-4">
                <SearchIcon className="size-4 text-muted-foreground" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search documentation..."
                  className="flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
              <ul className="max-h-72 overflow-y-auto p-2">
                {results.length === 0 && query ? (
                  <li className="px-3 py-6 text-center text-sm text-muted-foreground">
                    No results found.
                  </li>
                ) : null}
                {results.map((result) => (
                  <li key={result.id}>
                    <Link
                      href={result.url}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "block rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent"
                      )}
                    >
                      <span className="font-medium text-foreground">
                        {result.content ?? result.url}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
