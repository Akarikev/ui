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
    title: "Base UI primitives",
    description:
      "Built on accessible, unstyled React primitives from Base UI — modern and composable.",
  },
  {
    icon: PaletteIcon,
    title: "Tailwind CSS v4",
    description:
      "OKLCH design tokens, CSS-first config, and semantic color utilities out of the box.",
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
    <section className="border-t border-white/5 bg-[#050508] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Everything you need to ship UI
          </h2>
          <p className="mt-3 text-white/50">
            A modern component system designed for developers who want control.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-white/5 bg-white/[0.02] p-6 transition-colors hover:border-indigo-500/20 hover:bg-indigo-500/[0.03]"
            >
              <feature.icon className="mb-4 size-5 text-indigo-400" />
              <h3 className="mb-2 font-semibold text-white">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-white/50">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
