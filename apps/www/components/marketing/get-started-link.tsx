"use client"

import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function GetStartedLink() {
  return (
    <Link
      href="/docs/get-started/installation"
      className={cn(buttonVariants({ variant: "soft", size: "sm" }))}
    >
      Get Started
    </Link>
  )
}
