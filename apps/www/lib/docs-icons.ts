import type { LucideIcon } from "lucide-react"
import {
  Brain,
  Download,
  FileText,
  GitCompare,
  Palette,
  Terminal,
} from "lucide-react"

const GET_STARTED_ICONS: Record<string, LucideIcon> = {
  installation: Download,
  theming: Palette,
  cli: Terminal,
  "agent-skills": Brain,
  alternatives: GitCompare,
}

export function getDocsIcon(_slug: string, url: string): LucideIcon | null {
  if (url === "/docs" || url === "/docs/") {
    return FileText
  }

  const getStartedMatch = url.match(/\/docs\/get-started\/([^/]+)/)
  if (getStartedMatch) {
    return GET_STARTED_ICONS[getStartedMatch[1]] ?? null
  }

  return null
}
