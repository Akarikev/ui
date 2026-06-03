"use client"

import type { ReactNode } from "react"
import { Button as BaseButton } from "@/components/ui/button"
import { Button as RadixButton } from "@/components/ui-radix/button"
import { Button as HeroButton } from "@/components/ui-heroui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog as BaseDialog,
  DialogContent as BaseDialogContent,
  DialogHeader as BaseDialogHeader,
  DialogTitle as BaseDialogTitle,
  DialogTrigger as BaseDialogTrigger,
} from "@/components/ui/dialog"
import {
  Dialog as RadixDialog,
  DialogContent as RadixDialogContent,
  DialogHeader as RadixDialogHeader,
  DialogTitle as RadixDialogTitle,
  DialogTrigger as RadixDialogTrigger,
} from "@/components/ui-radix/dialog"
import {
  Dialog as HeroDialog,
  DialogContent as HeroDialogContent,
  DialogHeader as HeroDialogHeader,
  DialogTitle as HeroDialogTitle,
  DialogTrigger as HeroDialogTrigger,
} from "@/components/ui-heroui/dialog"
import { SocialLinks } from "@/components/ui/social-links"
import { NaviiAvatar } from "@/components/ui/navii-avatar"
import { BenchmarkGrid } from "@/components/blocks/benchmark-grid"
import { PromptComposer } from "@/components/blocks/prompt-composer"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { toast, Toaster } from "@/components/ui/sonner"
import { UiLibraryContent } from "@/components/docs/ui-library-content"
import { supportsHeroUi } from "@/lib/ui-library-availability"

type ExamplePreviewComponent = () => ReactNode

type LibraryExamplePreview = {
  base: ExamplePreviewComponent
  radix?: ExamplePreviewComponent
  heroui?: ExamplePreviewComponent
}

const examplePreviews: Record<string, Record<string, LibraryExamplePreview>> = {
  button: {
    default: {
      base: () => <BaseButton>Default</BaseButton>,
      radix: () => <RadixButton>Default</RadixButton>,
      heroui: () => <HeroButton>Default</HeroButton>,
    },
    secondary: {
      base: () => <BaseButton variant="secondary">Secondary</BaseButton>,
      radix: () => <RadixButton variant="secondary">Secondary</RadixButton>,
      heroui: () => <HeroButton variant="secondary">Secondary</HeroButton>,
    },
    outline: {
      base: () => <BaseButton variant="outline">Outline</BaseButton>,
      radix: () => <RadixButton variant="outline">Outline</RadixButton>,
      heroui: () => <HeroButton variant="outline">Outline</HeroButton>,
    },
    ghost: {
      base: () => <BaseButton variant="ghost">Ghost</BaseButton>,
      radix: () => <RadixButton variant="ghost">Ghost</RadixButton>,
      heroui: () => <HeroButton variant="ghost">Ghost</HeroButton>,
    },
    destructive: {
      base: () => <BaseButton variant="destructive">Destructive</BaseButton>,
      radix: () => (
        <RadixButton variant="destructive">Destructive</RadixButton>
      ),
      heroui: () => (
        <HeroButton variant="destructive">Destructive</HeroButton>
      ),
    },
    link: {
      base: () => <BaseButton variant="link">Link</BaseButton>,
      radix: () => <RadixButton variant="link">Link</RadixButton>,
      heroui: () => <HeroButton variant="link">Link</HeroButton>,
    },
    soft: {
      base: () => (
        <BaseButton variant="soft" size="soft">
          Request a demo
        </BaseButton>
      ),
      radix: () => (
        <RadixButton variant="soft" size="soft">
          Request a demo
        </RadixButton>
      ),
      heroui: () => (
        <HeroButton variant="soft" size="soft">
          Request a demo
        </HeroButton>
      ),
    },
    "soft-outline": {
      base: () => (
        <BaseButton variant="soft-outline" size="soft">
          Join waitlist
        </BaseButton>
      ),
      radix: () => (
        <RadixButton variant="soft-outline" size="soft">
          Join waitlist
        </RadixButton>
      ),
      heroui: () => (
        <HeroButton variant="soft-outline" size="soft">
          Join waitlist
        </HeroButton>
      ),
    },
  },
  badge: {
    default: { base: () => <Badge>Default</Badge> },
    secondary: { base: () => <Badge variant="secondary">Secondary</Badge> },
    outline: { base: () => <Badge variant="outline">Outline</Badge> },
    soft: { base: () => <Badge variant="soft">Soft</Badge> },
    destructive: {
      base: () => <Badge variant="destructive">Destructive</Badge>,
    },
  },
  input: {
    default: { base: () => <Input type="email" placeholder="Email" /> },
  },
  card: {
    basic: {
      base: () => (
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Title</CardTitle>
          </CardHeader>
          <CardContent>Content</CardContent>
        </Card>
      ),
    },
  },
  "benchmark-grid": {
    "custom-benchmark": {
      base: () => (
        <BenchmarkGrid
          benchmarks={[
            {
              title: "#1 on Support Bench",
              entries: [
                {
                  label: "elorm",
                  value: 92,
                  displayValue: "92%",
                  highlighted: true,
                },
                { label: "Baseline", value: 76, displayValue: "76%" },
              ],
              domain: [0, 100],
            },
          ]}
        />
      ),
    },
  },
  "prompt-composer": {
    "follow-up-composer": {
      base: () => (
        <PromptComposer variant="follow-up" placeholder="Send follow-up" />
      ),
    },
    "custom-suggestions": {
      base: () => (
        <PromptComposer
          suggestions={[
            { label: "Landing page", prompt: "Build a landing page for " },
            { label: "Dashboard", prompt: "Create a dashboard that tracks " },
          ]}
        />
      ),
    },
  },
  dialog: {
    basic: {
      base: () => (
        <BaseDialog>
          <BaseDialogTrigger render={<BaseButton>Open</BaseButton>} />
          <BaseDialogContent>
            <BaseDialogHeader>
              <BaseDialogTitle>Title</BaseDialogTitle>
            </BaseDialogHeader>
          </BaseDialogContent>
        </BaseDialog>
      ),
      radix: () => (
        <RadixDialog>
          <RadixDialogTrigger asChild>
            <RadixButton>Open</RadixButton>
          </RadixDialogTrigger>
          <RadixDialogContent>
            <RadixDialogHeader>
              <RadixDialogTitle>Title</RadixDialogTitle>
            </RadixDialogHeader>
          </RadixDialogContent>
        </RadixDialog>
      ),
      heroui: () => (
        <HeroDialog>
          <HeroDialogTrigger>
            <HeroButton>Open</HeroButton>
          </HeroDialogTrigger>
          <HeroDialogContent>
            <HeroDialogHeader>
              <HeroDialogTitle>Title</HeroDialogTitle>
            </HeroDialogHeader>
          </HeroDialogContent>
        </HeroDialog>
      ),
    },
  },
  "social-links": {
    default: {
      base: () => (
        <SocialLinks
          links={[{ platform: "github", href: "https://github.com/you" }]}
        />
      ),
    },
  },
  "navii-avatar": {
    default: {
      base: () => (
        <NaviiAvatar seed="alice@example.com" animated title="Alice" />
      ),
    },
    "photo-fallback": {
      base: () => (
        <Avatar>
          <AvatarImage src="/does-not-exist.png" alt="User" />
          <AvatarFallback className="p-0">
            <NaviiAvatar seed="carol@example.com" size={36} title="Carol" />
          </AvatarFallback>
        </Avatar>
      ),
    },
  },
  sonner: {
    "success-toast": {
      base: () => (
        <>
          <Toaster />
          <BaseButton
            variant="outline"
            onClick={() => toast.success("Saved successfully")}
          >
            Show success toast
          </BaseButton>
        </>
      ),
      radix: () => (
        <>
          <Toaster />
          <RadixButton
            variant="outline"
            onClick={() => toast.success("Saved successfully")}
          >
            Show success toast
          </RadixButton>
        </>
      ),
      heroui: () => (
        <>
          <Toaster />
          <HeroButton
            variant="outline"
            onClick={() => toast.success("Saved successfully")}
          >
            Show success toast
          </HeroButton>
        </>
      ),
    },
  },
}

function getExamplePreview(
  component: string,
  example: string
): LibraryExamplePreview | null {
  return examplePreviews[component]?.[example] ?? null
}

function PreviewFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[180px] items-center justify-center overflow-visible bg-background/60 p-8">
      {children}
    </div>
  )
}

export function ExamplePreviewSection({
  component,
  example,
}: {
  component: string
  example: string
}) {
  const preview = getExamplePreview(component, example)
  if (!preview) {
    return null
  }

  const BasePreview = preview.base
  const RadixPreview = preview.radix ?? preview.base
  const showHeroUi = supportsHeroUi(component)
  const HeroUiPreview = showHeroUi ? preview.heroui : undefined

  return (
    <UiLibraryContent
      base={
        <PreviewFrame>
          <BasePreview />
        </PreviewFrame>
      }
      radix={
        <PreviewFrame>
          <RadixPreview />
        </PreviewFrame>
      }
      heroui={
        HeroUiPreview ? (
          <PreviewFrame>
            <HeroUiPreview />
          </PreviewFrame>
        ) : undefined
      }
    />
  )
}
