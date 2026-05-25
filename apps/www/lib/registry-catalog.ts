import registry from "../../../registry.json"

type RegistryItem = (typeof registry.items)[number]

export type CatalogItem = {
  name: string
  title: string
  description: string
}

const CATEGORY_ORDER = [
  "forms",
  "overlay",
  "layout",
  "navigation",
  "data-display",
  "feedback",
  "ui",
] as const

export const CATEGORY_LABELS: Record<(typeof CATEGORY_ORDER)[number], string> = {
  forms: "Forms",
  overlay: "Overlay",
  layout: "Layout",
  navigation: "Navigation",
  "data-display": "Data display",
  feedback: "Feedback",
  ui: "General",
}

function toCatalogItem(item: RegistryItem): CatalogItem {
  return {
    name: item.name,
    title: item.title,
    description: item.description,
  }
}

function getPrimaryCategory(categories?: string[]) {
  if (!categories?.length) return "ui" as const

  for (const category of CATEGORY_ORDER) {
    if (categories.includes(category)) return category
  }

  return "ui" as const
}

const components = registry.items
  .filter((item) => item.type === "registry:ui")
  .map(toCatalogItem)

const blocks = registry.items
  .filter((item) => item.type === "registry:block")
  .map(toCatalogItem)

export const COMPONENT_COUNT = components.length
export const BLOCK_COUNT = blocks.length

export function getComponentGroups() {
  const groups = new Map<(typeof CATEGORY_ORDER)[number], CatalogItem[]>()

  for (const item of registry.items) {
    if (item.type !== "registry:ui") continue

    const category = getPrimaryCategory(item.categories)
    const existing = groups.get(category) ?? []
    existing.push(toCatalogItem(item))
    groups.set(category, existing)
  }

  return CATEGORY_ORDER.filter((category) => groups.has(category)).map(
    (category) => ({
      category,
      label: CATEGORY_LABELS[category],
      items: groups.get(category)!.sort((a, b) =>
        a.title.localeCompare(b.title)
      ),
    })
  )
}

export function getBlocks() {
  return [...blocks].sort((a, b) => a.title.localeCompare(b.title))
}
