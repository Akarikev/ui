import type { UiLibrary } from "@/lib/ui-library"

const HEROUI_COMPONENTS = new Set([
  "button",
  "checkbox",
  "dialog",
  "dropdown-menu",
  "select",
  "sheet",
  "switch",
  "tooltip",
])

const HEROUI_BLOCKS = new Set<string>()

function supportsHeroUi(component?: string) {
  if (!component) return false
  return HEROUI_COMPONENTS.has(component) || HEROUI_BLOCKS.has(component)
}

function getAvailableUiLibraries(component?: string): UiLibrary[] {
  return supportsHeroUi(component)
    ? ["base-ui", "radix", "heroui"]
    : ["base-ui", "radix"]
}

export { getAvailableUiLibraries, supportsHeroUi }
