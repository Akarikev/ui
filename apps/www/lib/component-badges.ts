import registry from "../../../registry.json"

const NEW_COMPONENT_DAYS = 14

export function getComponentSlugFromUrl(url: string): string | null {
  const match = url.match(/\/docs\/components\/([^/]+)/)
  return match?.[1] ?? null
}

function daysSinceAdded(dateStr: string): number {
  const [year, month, day] = dateStr.split("-").map(Number)
  if (!year || !month || !day) {
    return Number.POSITIVE_INFINITY
  }

  const addedDay = Date.UTC(year, month - 1, day)
  const now = new Date()
  const today = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate()
  )

  return Math.floor((today - addedDay) / (24 * 60 * 60 * 1000))
}

export function isNewComponent(name: string): boolean {
  const item = registry.items.find((entry) => entry.name === name)
  const addedAt = item?.meta?.addedAt
  if (!addedAt || typeof addedAt !== "string") {
    return false
  }

  const ageDays = daysSinceAdded(addedAt)
  return ageDays >= 0 && ageDays <= NEW_COMPONENT_DAYS
}
