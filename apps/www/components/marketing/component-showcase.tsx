import Link from "next/link"

const components = [
  { name: "button", title: "Button", description: "Actions and triggers." },
  { name: "input", title: "Input", description: "Form text fields." },
  { name: "dialog", title: "Dialog", description: "Modal overlays." },
  { name: "card", title: "Card", description: "Content containers." },
  { name: "select", title: "Select", description: "Option pickers." },
  { name: "sheet", title: "Sheet", description: "Side panels." },
  { name: "empty-state", title: "Empty State", description: "No-results blocks." },
  { name: "stat-card", title: "Stat Card", description: "Dashboard metrics." },
  { name: "page-header", title: "Page Header", description: "Page titles + actions." },
]

export function ComponentShowcase() {
  return (
    <section className="border-t border-white/5 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Component catalog
            </h2>
            <p className="mt-2 text-white/50">
              15 components and 3 blocks. Add any with one command.
            </p>
          </div>
          <Link
            href="/docs/components/button"
            className="text-sm text-indigo-400 transition-colors hover:text-indigo-300"
          >
            View all docs →
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {components.map((item) => (
            <Link
              key={item.name}
              href={`/docs/components/${item.name}`}
              className="group rounded-xl border border-white/5 bg-white/[0.02] p-5 transition-all hover:border-indigo-500/30 hover:bg-indigo-500/[0.04]"
            >
              <h3 className="font-medium text-white group-hover:text-indigo-200">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-white/40">{item.description}</p>
              <code className="mt-3 block text-xs text-white/25 group-hover:text-indigo-400/60">
                npx elorm add {item.name}
              </code>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
