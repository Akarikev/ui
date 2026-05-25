"use client"

import { useState, type ReactNode } from "react"
import { InstallCommand } from "@/components/docs/install-command"
import { NextJsLogo, ViteLogo } from "@/components/docs/framework-logos"
import { cn } from "@/lib/utils"

const FRAMEWORKS = [
  {
    id: "next",
    label: "Next.js",
    Icon: NextJsLogo,
    content: (
      <>
        <p>
          elorm/ui works with the Next.js App Router. Client components include{" "}
          <code>&quot;use client&quot;</code> automatically.
        </p>
        <InstallCommand command="elorm init --template next" />
      </>
    ),
  },
  {
    id: "vite",
    label: "Vite",
    Icon: ViteLogo,
    content: (
      <>
        <p>For Vite + React SPAs:</p>
        <InstallCommand command="elorm init --template vite" />
        <p>
          Ensure your CSS entry imports Tailwind and the elorm token variables.
        </p>
      </>
    ),
  },
] as const satisfies ReadonlyArray<{
  id: string
  label: string
  Icon: typeof NextJsLogo
  content: ReactNode
}>

function FrameworkTabs({ panels }: { panels: typeof FRAMEWORKS }) {
  const [active, setActive] = useState(0)
  const current = panels[active]

  return (
    <div className="not-prose my-6 overflow-hidden rounded-xl border border-border bg-card">
      <div
        role="tablist"
        aria-label="Framework setup"
        className="flex flex-wrap gap-1 border-b border-border bg-muted/20 p-1.5"
      >
        {panels.map((panel, index) => {
          const selected = index === active

          return (
            <button
              key={panel.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(index)}
              className={cn(
                "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                selected
                  ? "bg-background text-foreground shadow-sm ring-1 ring-border/60"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <panel.Icon />
              <span>{panel.label}</span>
            </button>
          )
        })}
      </div>
      <div
        role="tabpanel"
        className="flex flex-col gap-4 p-4 text-sm leading-relaxed text-muted-foreground [&_code]:text-foreground"
      >
        {current.content}
      </div>
    </div>
  )
}

export function FrameworkSetup() {
  return <FrameworkTabs panels={FRAMEWORKS} />
}
