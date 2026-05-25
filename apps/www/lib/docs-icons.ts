import type { LucideIcon } from "lucide-react"
import {
  Badge,
  Box,
  ChevronDown,
  CircleDot,
  CreditCard,
  Download,
  FileText,
  FormInput,
  Heading,
  LayoutGrid,
  LayoutPanelTop,
  MousePointerClick,
  Palette,
  PanelTop,
  SeparatorHorizontal,
  Square,
  SwitchCamera,
  Terminal,
  TextCursorInput,
  ToggleLeft,
  MessageSquareText,
  Type,
  Layers,
} from "lucide-react"

const COMPONENT_ICONS: Record<string, LucideIcon> = {
  button: MousePointerClick,
  input: TextCursorInput,
  textarea: FormInput,
  label: Type,
  checkbox: CircleDot,
  switch: ToggleLeft,
  select: ChevronDown,
  dialog: PanelTop,
  sheet: LayoutPanelTop,
  "dropdown-menu": Layers,
  tooltip: MessageSquareText,
  card: CreditCard,
  badge: Badge,
  separator: SeparatorHorizontal,
  skeleton: Square,
  "empty-state": Box,
  "stat-card": LayoutGrid,
  "page-header": Heading,
}

const PAGE_ICONS: Record<string, LucideIcon> = {
  index: FileText,
  installation: Download,
  theming: Palette,
  cli: Terminal,
}

export function getDocsIcon(slug: string, url: string): LucideIcon | null {
  const componentMatch = url.match(/\/docs\/components\/([^/]+)/)
  if (componentMatch) {
    return COMPONENT_ICONS[componentMatch[1]] ?? Box
  }

  const pageMatch = url.match(/\/docs(?:\/get-started)?\/([^/]+)/)
  if (pageMatch) {
    return PAGE_ICONS[pageMatch[1]] ?? null
  }

  if (url === "/docs" || url === "/docs/") {
    return FileText
  }

  return COMPONENT_ICONS[slug] ?? PAGE_ICONS[slug] ?? null
}
