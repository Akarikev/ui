import { BoxIcon, CopyIcon, PaletteIcon, SparklesIcon } from "lucide-react"

const features = [
  {
    icon: CopyIcon,
    title: "Copy-paste ownership",
    description:
      "Components live in your codebase. Customize freely without fighting a black-box npm package.",
  },
  {
    icon: BoxIcon,
    title: "Base UI or Radix",
    description:
      "Choose your headless library at init — Base UI for modern primitives, Radix for ecosystem familiarity.",
  },
  {
    icon: PaletteIcon,
    title: "Theme presets",
    description:
      "OKLCH tokens with base colors, accent hues, and radius presets. Switch themes with the CLI.",
  },
  {
    icon: SparklesIcon,
    title: "AI-first DX",
    description:
      "Structured registry metadata and elorm docs --json for agents and coding assistants.",
  },
]

export function FeatureGrid() {
  return (
    <section className="border-t border-border bg-background px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Everything you need to ship UI
          </h2>
          <p className="mt-3 text-muted-foreground">
            A modern component system designed for developers who want control.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-border bg-card/50 p-6 transition-colors hover:border-primary/30 hover:bg-card"
            >
              <feature.icon className="mb-4 size-5 text-primary" />
              <h3 className="mb-2 font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
