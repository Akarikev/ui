import { notFound } from "next/navigation"
import { getPreviewDemo } from "@/components/preview/registry"
import { PreviewTheme } from "@/components/preview/preview-theme"

const VALID_COMPONENTS = new Set([
  "button",
  "input",
  "textarea",
  "label",
  "checkbox",
  "switch",
  "select",
  "dialog",
  "sheet",
  "card",
  "badge",
  "separator",
  "tooltip",
  "skeleton",
  "dropdown-menu",
  "empty-state",
  "stat-card",
  "page-header",
])

interface PreviewPageProps {
  params: Promise<{ component: string }>
  searchParams: Promise<{
    theme?: string
    accent?: string
    mode?: string
  }>
}

export default async function PreviewPage({
  params,
  searchParams,
}: PreviewPageProps) {
  const { component } = await params
  const { theme, accent, mode } = await searchParams

  if (!VALID_COMPONENTS.has(component)) {
    notFound()
  }

  const Demo = getPreviewDemo(component)

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-8">
      <PreviewTheme theme={theme} accent={accent} mode={mode} />
      <Demo />
    </div>
  )
}
