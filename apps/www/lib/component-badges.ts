import registry from "../../../registry.json"

const NEW_COMPONENT_DAYS = 7

export function getComponentSlugFromUrl(url: string): string | null {
  const match = url.match(/\/docs\/components\/([^/]+)/)
  return match?.[1] ?? null
}

export function isNewComponent(name: string): boolean {
  const item = registry.items.find((entry) => entry.name === name)
  const addedAt = item?.meta?.addedAt
  if (!addedAt || typeof addedAt !== "string") {
    return false
  }

  const added = new Date(addedAt)
  if (Number.isNaN(added.getTime())) {
    return false
  }

  const ageMs = Date.now() - added.getTime()
  return ageMs >= 0 && ageMs <= NEW_COMPONENT_DAYS * 24 * 60 * 60 * 1000
}
