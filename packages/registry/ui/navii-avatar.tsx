"use client"

import * as React from "react"
import { Navii, type NaviiProps } from "@usenavii/react"

import { cn } from "@/lib/utils"

interface NaviiAvatarProps extends NaviiProps {}

function NaviiAvatar({
  seed,
  size = 36,
  className,
  ...props
}: NaviiAvatarProps) {
  return (
    <Navii
      seed={seed}
      size={size}
      className={cn("rounded-full ring-1 ring-border/50", className)}
      {...props}
    />
  )
}

export { NaviiAvatar, type NaviiAvatarProps }
