"use client"

import { useEffect, useState, type ReactNode } from "react"
import type { UiLibrary } from "@/lib/ui-library"

function resolveUiLibrary(): UiLibrary {
  if (typeof document === "undefined") {
    return "base-ui"
  }

  const selected = document.documentElement.dataset.uiLibrary
  if (selected === "radix" || selected === "heroui" || selected === "base-ui") {
    return selected
  }

  return "base-ui"
}

export function UiLibraryContent({
  base,
  radix,
  heroui,
}: {
  base: ReactNode
  radix?: ReactNode
  heroui?: ReactNode
}) {
  const [selected, setSelected] = useState<UiLibrary>("base-ui")

  useEffect(() => {
    const updateSelected = () => setSelected(resolveUiLibrary())
    updateSelected()

    const observer = new MutationObserver(updateSelected)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-ui-library"],
    })

    return () => observer.disconnect()
  }, [])

  if (selected === "radix") {
    return <>{radix ?? base}</>
  }

  if (selected === "heroui") {
    return <>{heroui ?? base}</>
  }

  return <>{base}</>
}
