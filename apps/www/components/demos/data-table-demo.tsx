import { DataTable } from "@/components/blocks/data-table"

export function DataTableDemo() {
  return (
    <DataTable
      rows={[
        { id: "1", name: "Alice Chen", email: "alice@example.com", status: "Active" },
        { id: "2", name: "Bob Smith", email: "bob@example.com", status: "Pending" },
        { id: "3", name: "Carol Lee", email: "carol@example.com", status: "Active" },
      ]}
    />
  )
}
