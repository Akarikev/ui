"use client"

import { useState } from "react"
import { ButtonDemo } from "@/components/demos/button-demo"
import { InputDemo } from "@/components/demos/input-demo"
import { CardDemo } from "@/components/demos/card-demo"
import { DialogDemo } from "@/components/demos/dialog-demo"
import { CopyCommand } from "@/components/marketing/copy-command"
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

export function DocsPreview() {
  const [active, setActive] = useState<PreviewId>("button")
  const current = previews.find((p) => p.id === active) ?? previews[0]
  const Demo = current.Demo

  return (
    <section className="relative z-20 mx-auto -mt-40 max-w-5xl px-6 pb-24 md:-mt-48">
      <div className="overflow-hidden rounded-xl border border-border bg-card/95 shadow-2xl shadow-black/10 backdrop-blur-xl">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <div className="size-3 rounded-full bg-red-500/80" />
          <div className="size-3 rounded-full bg-yellow-500/80" />
          <div className="size-3 rounded-full bg-green-500/80" />
          <span className="ml-2 font-mono text-xs text-muted-foreground">
            ui.elorm.xyz/docs
          </span>
        </div>

        <div className="flex min-h-[320px]">
          <aside className="hidden w-48 shrink-0 border-r border-border p-4 sm:block">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
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

          <div className="flex-1 p-6 sm:p-8">
            <div className="mb-3 flex gap-2 overflow-x-auto sm:hidden">
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
            <h3 className="mb-2 text-xl font-semibold text-foreground">
              {current.title}
            </h3>
            <p className="mb-6 text-sm text-muted-foreground">
              {current.description}
            </p>
            <div className="rounded-lg border border-border bg-background p-6 text-foreground">
              <Demo />
            </div>
            <div className="mt-4">
              <CopyCommand command={current.command} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
