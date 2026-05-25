"use client"

import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { SearchIcon } from "lucide-react"

export function InputGroupDemo() {
  return (
    <InputGroup className="max-w-sm">
      <InputGroupAddon>
        <SearchIcon className="size-4" />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon align="inline-end">
        <Button variant="ghost" size="xs">
          Go
        </Button>
      </InputGroupAddon>
    </InputGroup>
  )
}
