"use client"

import { useState } from "react"
import { CheckIcon, CopyIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const MANAGERS = [
  { id: "npm", label: "npm", prefix: "npx" },
  { id: "pnpm", label: "pnpm", prefix: "pnpm dlx" },
  { id: "yarn", label: "yarn", prefix: "yarn dlx" },
  { id: "bun", label: "bun", prefix: "bunx" },
] as const

export function CopyCommand({
  command,
  variant = "default",
  align = "center",
}: {
  command: string
  variant?: "default" | "hero"
  align?: "center" | "start"
}) {
  const isHero = variant === "hero"
  const [copied, setCopied] = useState(false)
  const [manager, setManager] = useState<(typeof MANAGERS)[number]["id"]>("npm")

  const active = MANAGERS.find((m) => m.id === manager) ?? MANAGERS[0]
  const fullCommand = `${active.prefix} ${command}`

  async function copy() {
    await navigator.clipboard.writeText(fullCommand)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="w-full max-w-md">
      <div
        className={cn(
          "mb-2 flex gap-1",
          align === "start" ? "justify-start" : "justify-center"
        )}
      >
        {MANAGERS.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setManager(m.id)}
            className={cn(
              "rounded-md px-2 py-1 text-xs transition-colors",
              manager === m.id
                ? isHero
                  ? "bg-white/20 font-medium text-white"
                  : "bg-primary/20 font-medium text-primary"
                : isHero
                  ? "text-white/70 hover:text-white"
                  : "text-foreground/70 hover:text-foreground"
            )}
          >
            {m.label}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={copy}
        className={cn(
          "group flex w-full items-center gap-3 rounded-full border px-5 py-3 text-left shadow-sm transition-colors",
          isHero
            ? "border-white/20 bg-black/35 text-white backdrop-blur-md hover:bg-black/45"
            : "border-border bg-background/90 hover:bg-background"
        )}
      >
        <code className={cn("flex-1 text-sm", isHero ? "text-white" : "text-foreground")}>
          {fullCommand}
        </code>
        <span
          className={cn(
            "transition-colors group-hover:text-foreground",
            isHero ? "text-white/70 group-hover:text-white" : "text-muted-foreground"
          )}
        >
          {copied ? (
            <CheckIcon className="size-4 text-emerald-500" />
          ) : (
            <CopyIcon className="size-4" />
          )}
        </span>
      </button>
    </div>
  )
}
