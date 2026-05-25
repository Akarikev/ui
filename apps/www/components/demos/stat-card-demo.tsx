import { StatCard } from "@/components/blocks/stat-card"

export function StatCardDemo() {
  return (
    <div className="w-full max-w-sm">
      <StatCard
        title="Monthly revenue"
        value="$12,420"
        description="+12% from last month"
        trend={{ value: "+12%", positive: true }}
      />
    </div>
  )
}
