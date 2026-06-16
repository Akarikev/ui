import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

const cards = [
  {
    eyebrow: "01",
    title: "Rounded cards",
    description: "Larger radii and softer inset highlights for app panels.",
  },
  {
    eyebrow: "02",
    title: "Quiet borders",
    description: "Hairline borders stay visible without making surfaces heavy.",
  },
  {
    eyebrow: "03",
    title: "Smooth feedback",
    description: "Progress variants are thinner, calmer, and easier to compose.",
  },
]

export function NagomiPreview() {
  return (
    <div className="not-prose my-6 rounded-[2rem] border border-border/50 bg-card/80 p-3 shadow-[0_18px_70px_-44px_oklch(0_0_0_/_0.7)] ring-1 ring-foreground/[0.03]">
      <div className="grid overflow-hidden rounded-[1.5rem] border border-border/45 bg-background/70 md:grid-cols-3">
        {cards.map((card, index) => (
          <div
            key={card.title}
            className={cn(
              "flex min-h-36 flex-col justify-between gap-5 p-5",
              index > 0 && "border-t border-border/45 md:border-l md:border-t-0"
            )}
          >
            <span className="w-fit rounded-xl border border-border/50 bg-muted/40 px-2 py-1 text-xs text-muted-foreground">
              {card.eyebrow}
            </span>
            <div className="grid gap-2">
              <h3 className="font-semibold text-foreground">{card.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-[1.5rem] border border-border/45 bg-background/70 p-5">
        <Progress
          variant="labeled"
          label="Nagomi preview"
          value={84}
          className="max-w-none"
        />
      </div>
    </div>
  )
}
