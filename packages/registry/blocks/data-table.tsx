"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { SearchIcon } from "lucide-react"

const defaultRows = [
  { id: "1", name: "Alice Chen", email: "alice@example.com", status: "Active" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", status: "Pending" },
  { id: "3", name: "Carol Lee", email: "carol@example.com", status: "Active" },
]

function DataTable({
  className,
  rows = defaultRows,
  ...props
}: React.ComponentProps<"div"> & {
  rows?: Array<{ id: string; name: string; email: string; status: string }>
}) {
  return (
    <div data-slot="data-table" className={cn("flex flex-col gap-4", className)} {...props}>
      <InputGroup className="max-w-sm">
        <InputGroupAddon>
          <SearchIcon className="size-4" />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search users..." />
      </InputGroup>
      <div className="rounded-xl ring-1 ring-border/50">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-medium">{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  <Badge variant={row.status === "Active" ? "success" : "secondary"}>
                    {row.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export { DataTable }
