import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/blocks/page-header"

export function PageHeaderDemo() {
  return (
    <div className="w-full max-w-2xl rounded-lg border border-border p-4">
      <PageHeader
        title="Projects"
        description="Manage your teams, members, and active deployments."
        actions={<Button size="sm">Create project</Button>}
      />
    </div>
  )
}
