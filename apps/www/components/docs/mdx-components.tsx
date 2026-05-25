import * as React from "react"
import Link from "next/link"
import { Card, Cards } from "fumadocs-ui/components/card"
import { Callout } from "fumadocs-ui/components/callout"
import { Tab, Tabs } from "fumadocs-ui/components/tabs"
import { Steps, Step } from "fumadocs-ui/components/steps"
import type { MDXComponents } from "mdx/types"
import { cn } from "@/lib/utils"
import { CodeBlockCommand } from "@/components/docs/code-block-command"
import { ComponentPreviewTabs } from "@/components/docs/component-preview-tabs"
import { CopyButton } from "@/components/docs/copy-button"
import { InstallCommand } from "@/components/docs/install-command"
import { LibraryCodeBlock } from "@/components/docs/library-code-block"

function getNodeText(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(getNodeText).join("")
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return getNodeText(node.props.children)
  }
  return ""
}

function headingId(children: React.ReactNode, id?: string) {
  if (id) return id
  return getNodeText(children)
    .trim()
    .replace(/\s+/g, "-")
    .replace(/'/g, "")
    .replace(/\?/g, "")
    .toLowerCase()
}

function Heading({
  as: Tag,
  className,
  children,
  id,
  ...props
}: React.ComponentProps<"h2"> & { as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" }) {
  const computedId = headingId(children, id)
  return (
    <Tag
      id={computedId}
      className={cn("group scroll-m-20", className)}
      {...props}
    >
      {children}
      {computedId ? (
        <a
          href={`#${computedId}`}
          className="ml-1 opacity-0 transition-opacity group-hover:opacity-100"
          aria-label={`Link to section`}
        >
          #
        </a>
      ) : null}
    </Tag>
  )
}

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    h1: ({ className, ...props }) => (
      <Heading
        as="h1"
        className={cn(
          "mt-8 text-2xl font-semibold tracking-tight text-foreground first:mt-0",
          className
        )}
        {...props}
      />
    ),
    h2: ({ className, ...props }) => (
      <Heading
        as="h2"
        className={cn(
          "mt-10 text-lg font-semibold tracking-tight text-foreground first:mt-0",
          className
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props }) => (
      <Heading
        as="h3"
        className={cn(
          "mt-8 text-base font-medium tracking-tight text-foreground",
          className
        )}
        {...props}
      />
    ),
    h4: ({ className, ...props }) => (
      <Heading
        as="h4"
        className={cn("mt-6 text-sm font-medium text-foreground", className)}
        {...props}
      />
    ),
    h5: ({ className, ...props }) => (
      <Heading as="h5" className={cn("mt-4 text-sm font-medium", className)} {...props} />
    ),
    h6: ({ className, ...props }) => (
      <Heading as="h6" className={cn("mt-4 text-sm font-medium", className)} {...props} />
    ),
    p: ({ className, ...props }) => (
      <p
        className={cn("leading-7 text-muted-foreground [&:not(:first-child)]:mt-4", className)}
        {...props}
      />
    ),
    a: ({ className, href, ...props }) => {
      const isExternal = href?.startsWith("http")
      const classes = cn(
        "font-medium text-foreground underline underline-offset-4 hover:text-primary",
        className
      )
      if (isExternal) {
        return <a href={href} className={classes} {...props} />
      }
      return <Link href={href ?? "#"} className={classes} {...props} />
    },
    ul: ({ className, ...props }) => (
      <ul
        className={cn("my-4 ml-6 list-disc text-muted-foreground [&>li]:mt-2", className)}
        {...props}
      />
    ),
    ol: ({ className, ...props }) => (
      <ol
        className={cn("my-4 ml-6 list-decimal text-muted-foreground [&>li]:mt-2", className)}
        {...props}
      />
    ),
    li: ({ className, ...props }) => (
      <li className={cn("leading-7", className)} {...props} />
    ),
    blockquote: ({ className, ...props }) => (
      <blockquote
        className={cn("mt-4 border-l-2 border-border pl-4 text-muted-foreground", className)}
        {...props}
      />
    ),
    hr: ({ ...props }) => <hr className="my-8 border-border" {...props} />,
    table: ({ className, ...props }) => (
      <div className="my-6 w-full overflow-auto">
        <table className={cn("w-full border-collapse text-sm", className)} {...props} />
      </div>
    ),
    th: ({ className, ...props }) => (
      <th
        className={cn(
          "border border-border bg-muted/50 px-4 py-2 text-left font-medium text-foreground",
          className
        )}
        {...props}
      />
    ),
    td: ({ className, ...props }) => (
      <td
        className={cn("border border-border px-4 py-2 text-muted-foreground", className)}
        {...props}
      />
    ),
    pre: ({ className, children, ...props }) => (
      <div className="not-prose relative my-6 overflow-hidden rounded-lg border border-border bg-muted/20">
        {typeof children === "object" &&
        children !== null &&
        "props" in children &&
        typeof (children as React.ReactElement<{ children?: string }>).props.children ===
          "string" ? (
          <div className="absolute right-3 top-3 z-10">
            <CopyButton
              value={
                (children as React.ReactElement<{ children?: string }>).props.children ?? ""
              }
            />
          </div>
        ) : null}
        <pre
          className={cn(
            "overflow-x-auto bg-transparent px-5 py-4 font-mono text-sm leading-relaxed text-foreground",
            className
          )}
          {...props}
        >
          {children}
        </pre>
      </div>
    ),
    code: ({
      className,
      children,
      __raw__,
      __npm__,
      __yarn__,
      __pnpm__,
      __bun__,
      ...props
    }: React.ComponentProps<"code"> & {
      __raw__?: string
      __npm__?: string
      __yarn__?: string
      __pnpm__?: string
      __bun__?: string
    }) => {
      if (__npm__ && __pnpm__ && __yarn__ && __bun__) {
        return (
          <CodeBlockCommand
            __npm__={__npm__}
            __pnpm__={__pnpm__}
            __yarn__={__yarn__}
            __bun__={__bun__}
          />
        )
      }

      if (typeof children === "string" && !className?.includes("language-")) {
        return (
          <code
            className={cn(
              "rounded border border-border bg-muted/50 px-1.5 py-0.5 font-mono text-sm text-foreground",
              className
            )}
            {...props}
          >
            {children}
          </code>
        )
      }

      return (
        <code className={cn("font-mono text-sm", className)} {...props}>
          {children}
        </code>
      )
    },
    ComponentPreviewTabs,
    LibraryCodeBlock,
    InstallCommand,
    CodeBlockCommand,
    Card,
    Cards,
    Callout,
    Tabs,
    Tab,
    Steps,
    Step,
    ...components,
  }
}
