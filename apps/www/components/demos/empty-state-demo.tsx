import { EmptyState } from "@/components/blocks/empty-state"

export function EmptyStateDemo() {
  return (
    <EmptyState
      title="No results found"
      description="Try adjusting your search or filter to find what you're looking for."
      action={{ label: "Clear filters", onClick: () => {} }}
    />
  )
}
