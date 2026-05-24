import { ButtonDemo } from "@/components/demos/button-demo"

export function DocsPreview() {
  return (
    <section className="relative mx-auto max-w-5xl px-6 pb-24">
      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0f]/90 shadow-2xl shadow-indigo-500/10 backdrop-blur-sm">
        <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
          <div className="size-3 rounded-full bg-red-500/80" />
          <div className="size-3 rounded-full bg-yellow-500/80" />
          <div className="size-3 rounded-full bg-green-500/80" />
          <span className="ml-2 text-xs text-white/30">ui.elorm.xyz/docs</span>
        </div>

        <div className="flex min-h-[320px]">
          <aside className="hidden w-48 shrink-0 border-r border-white/5 p-4 sm:block">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-white/30">
              Components
            </p>
            <ul className="flex flex-col gap-1 text-sm">
              <li className="rounded-md bg-indigo-500/20 px-2 py-1.5 text-indigo-200">
                Button
              </li>
              <li className="px-2 py-1.5 text-white/40">Input</li>
              <li className="px-2 py-1.5 text-white/40">Dialog</li>
              <li className="px-2 py-1.5 text-white/40">Card</li>
            </ul>
          </aside>

          <div className="flex-1 p-6 sm:p-8">
            <div className="mb-1 text-xs text-indigo-400/80">Components</div>
            <h3 className="mb-2 text-xl font-semibold text-white">Button</h3>
            <p className="mb-6 text-sm text-white/50">
              Displays a button or a component that looks like a button.
            </p>
            <div className="rounded-lg border border-white/5 bg-white/[0.02] p-6">
              <ButtonDemo />
            </div>
            <code className="mt-4 block rounded-md bg-black/40 px-3 py-2 text-left text-xs text-indigo-300/80">
              npx elorm add button
            </code>
          </div>
        </div>
      </div>
    </section>
  )
}
