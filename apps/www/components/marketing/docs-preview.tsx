"use client"

import { useState } from "react"
import { ButtonDemo } from "@/components/demos/button-demo"
import { InputDemo } from "@/components/demos/input-demo"
import { CardDemo } from "@/components/demos/card-demo"
import { DialogDemo } from "@/components/demos/dialog-demo"
import { CopyCommand } from "@/components/marketing/copy-command"
import { ElormLogoMark } from "@/components/marketing/logo"
import { softRadius, softShadow } from "@/lib/ui-styles"
import { cn } from "@/lib/utils"

const previews = [
  {
    id: "button",
    title: "Button",
    description: "Displays a button or a component that looks like a button.",
    command: "elorm add button",
    Demo: ButtonDemo,
  },
  {
    id: "input",
    title: "Input",
    description: "Displays a form input field or a component that looks like one.",
    command: "elorm add input",
    Demo: InputDemo,
  },
  {
    id: "dialog",
    title: "Dialog",
    description: "A window overlaid on the primary window or another dialog.",
    command: "elorm add dialog",
    Demo: DialogDemo,
  },
  {
    id: "card",
    title: "Card",
    description: "Displays a card with header, content, and footer.",
    command: "elorm add card",
    Demo: CardDemo,
  },
] as const

type PreviewId = (typeof previews)[number]["id"]

export function DocsPreview({ embedded = false }: { embedded?: boolean }) {
  const [active, setActive] = useState<PreviewId>("button")
  const current = previews.find((p) => p.id === active) ?? previews[0]
  const Demo = current.Demo

  const card = (
    <div
      className={cn(
        "overflow-hidden border border-border/60 bg-card/95 backdrop-blur-xl",
        softRadius,
        softShadow
      )}
    >
      <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3">
        <ElormLogoMark className="size-4 text-muted-foreground" />
        <span className="font-mono text-xs text-muted-foreground">
          ui.elorm.xyz/docs
        </span>
      </div>

      <div className={cn("flex", embedded ? "min-h-[280px]" : "min-h-[320px]")}>
        <aside className="hidden w-40 shrink-0 border-r border-border/60 p-3 lg:block xl:w-44">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Components
          </p>
          <ul className="flex flex-col gap-1 text-sm">
            {previews.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setActive(item.id)}
                  className={cn(
                    "w-full rounded-md px-2 py-1.5 text-left transition-colors",
                    active === item.id
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className={cn("flex-1", embedded ? "p-4 sm:p-5" : "p-6 sm:p-8")}>
          <div className="mb-3 flex gap-2 overflow-x-auto lg:hidden">
            {previews.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(item.id)}
                className={cn(
                  "shrink-0 rounded-full px-3 py-1 text-xs transition-colors",
                  active === item.id
                    ? "bg-primary/15 text-primary"
                    : "border border-border text-muted-foreground"
                )}
              >
                {item.title}
              </button>
            ))}
          </div>

          <div className="mb-1 text-xs text-primary/80">Components</div>
          <h3 className="mb-1 text-lg font-semibold text-foreground sm:text-xl">
            {current.title}
          </h3>
          <p className="mb-4 text-sm text-muted-foreground">
            {current.description}
          </p>
          <div className="rounded-lg border border-border/60 bg-background p-4 text-foreground sm:p-5">
            <Demo />
          </div>
          <div className="mt-3">
            <CopyCommand command={current.command} align="start" />
          </div>
        </div>
      </div>
    </div>
  )

  if (embedded) {
    return card
  }

  return (
    <section className="relative z-20 mx-auto max-w-5xl px-6 pb-16">
      {card}
    </section>
  )
}
