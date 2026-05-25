import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function TableDemo() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Alice Chen</TableCell>
          <TableCell>Active</TableCell>
          <TableCell>Admin</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Bob Smith</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell>Editor</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
