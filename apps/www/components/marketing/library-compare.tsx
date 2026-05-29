"use client"

import { useState } from "react"
import { PrimitiveDemo } from "@/components/demos/primitive-demo"
import { CopyCommand } from "@/components/marketing/copy-command"
import { UiPreviewBadge } from "@/components/docs/ui-preview-badge"
import {
  PRIMITIVE_COMPONENTS,
  UI_LIBRARIES,
  type PrimitiveId,
  type UiLibrary,
} from "@/lib/ui-library"
import { cn } from "@/lib/utils"
import { softRadius, softShadow, surfaceSoft } from "@/lib/ui-styles"

export function LibraryCompare() {
  const [library, setLibrary] = useState<UiLibrary>("base-ui")
  const [component, setComponent] = useState<PrimitiveId>("button")

  const libraryMeta = UI_LIBRARIES.find((item) => item.id === library)!

  return (
    <section id="library-compare" className="px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
            Primitives
          </p>
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Base UI, Radix, or HeroUI — same look, your choice
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            elorm/ui ships identical styled components on top of Base UI, Radix,
            or HeroUI wrappers. Switch below to compare behavior and pick what
            fits your stack.
          </p>
        </div>

        <div className="mb-6 flex justify-center">
          <div className="flex w-full max-w-md gap-1 rounded-xl border border-border bg-card p-1 sm:inline-flex sm:w-auto">
            {UI_LIBRARIES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setLibrary(item.id)}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2 text-xs font-medium whitespace-nowrap transition-colors sm:flex-none sm:gap-1.5 sm:px-4 sm:py-2 sm:text-sm",
                    library === item.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                  {item.id === "heroui" ? (
                    <UiPreviewBadge
                      size="sm"
                      variant={library === item.id ? "inverse" : "default"}
                      className="hidden sm:inline-flex"
                    />
                  ) : null}
                </button>
              ))}
          </div>
        </div>

        <p className="mb-8 text-center text-sm text-muted-foreground">
          {libraryMeta.description}
        </p>

        <div
          className={cn(
            "overflow-hidden border border-border/60 bg-card",
            softRadius,
            softShadow
          )}
        >
          <div className="flex flex-wrap gap-2 border-b border-border/60 p-4">
            {PRIMITIVE_COMPONENTS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setComponent(item.id)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                  component === item.id
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                {item.title}
              </button>
            ))}
          </div>

          <div className="flex min-h-[220px] items-center justify-center p-8">
            <PrimitiveDemo component={component} library={library} />
          </div>

          <div className={cn("border-t border-border/60 p-4", surfaceSoft)}>
            <CopyCommand command={`elorm init --ui-library ${library}`} />
          </div>
        </div>
      </div>
    </section>
  )
}
