"use client"

import { toast, Toaster } from "@/components/ui/sonner"
import { Button } from "@/components/ui/button"

export function SonnerDemo() {
  return (
    <>
      <Toaster />
      <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={() => toast("Event has been created")}>
        Default
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.success("Profile updated successfully")}
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.error("Something went wrong")}
      >
        Error
      </Button>
      </div>
    </>
  )
}
