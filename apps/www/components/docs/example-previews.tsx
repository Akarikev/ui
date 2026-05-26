"use client"

import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { SocialLinks } from "@/components/ui/social-links"
import { NaviiAvatar } from "@/components/ui/navii-avatar"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

type ExamplePreviewComponent = () => ReactNode

const examplePreviews: Record<string, Record<string, ExamplePreviewComponent>> =
  {
    button: {
      default: () => <Button>Default</Button>,
      secondary: () => <Button variant="secondary">Secondary</Button>,
      outline: () => <Button variant="outline">Outline</Button>,
      ghost: () => <Button variant="ghost">Ghost</Button>,
      destructive: () => (
        <Button variant="destructive">Destructive</Button>
      ),
      link: () => <Button variant="link">Link</Button>,
      soft: () => (
        <Button variant="soft" size="soft">
          Request a demo
        </Button>
      ),
      "soft-outline": () => (
        <Button variant="soft-outline" size="soft">
          Join waitlist
        </Button>
      ),
    },
    badge: {
      default: () => <Badge>Default</Badge>,
      secondary: () => <Badge variant="secondary">Secondary</Badge>,
      outline: () => <Badge variant="outline">Outline</Badge>,
      soft: () => <Badge variant="soft">Soft</Badge>,
      destructive: () => <Badge variant="destructive">Destructive</Badge>,
    },
    input: {
      default: () => <Input type="email" placeholder="Email" />,
    },
    card: {
      basic: () => (
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Title</CardTitle>
          </CardHeader>
          <CardContent>Content</CardContent>
        </Card>
      ),
    },
    dialog: {
      basic: () => (
        <Dialog>
          <DialogTrigger render={<Button>Open</Button>} />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Title</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ),
    },
    "social-links": {
      default: () => (
        <SocialLinks
          links={[{ platform: "github", href: "https://github.com/you" }]}
        />
      ),
    },
    "navii-avatar": {
      default: () => (
        <NaviiAvatar seed="alice@example.com" animated title="Alice" />
      ),
      "photo-fallback": () => (
        <Avatar>
          <AvatarImage src="/does-not-exist.png" alt="User" />
          <AvatarFallback className="p-0">
            <NaviiAvatar seed="carol@example.com" size={36} title="Carol" />
          </AvatarFallback>
        </Avatar>
      ),
    },
  }

function getExamplePreview(
  component: string,
  example: string
): ExamplePreviewComponent | null {
  return examplePreviews[component]?.[example] ?? null
}

export function ExamplePreviewSection({
  component,
  example,
}: {
  component: string
  example: string
}) {
  const Preview = getExamplePreview(component, example)
  if (!Preview) {
    return null
  }

  return (
    <>
      <div className="ui-base-only flex min-h-[180px] items-center justify-center bg-background/60 p-8">
        <Preview />
      </div>
      <div className="ui-radix-only flex min-h-[180px] items-center justify-center bg-background/60 p-8">
        <Preview />
      </div>
    </>
  )
}
