"use client"

import * as React from "react"

import { Progress } from "@/components/ui/progress"

export function ProgressDemo() {
  const [value, setValue] = React.useState(18)

  React.useEffect(() => {
    const timer = window.setInterval(() => {
      setValue((current) => (current >= 92 ? 18 : current + 8))
    }, 700)

    return () => window.clearInterval(timer)
  }, [])

  return <Progress variant="animated" value={value} className="w-full max-w-sm" />
}
