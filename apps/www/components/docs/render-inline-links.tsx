import Link from "next/link"
import type { ReactNode } from "react"

const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g

function isExternal(href: string) {
  return href.startsWith("http://") || href.startsWith("https://")
}

export function stripInlineLinks(text: string) {
  return text.replace(LINK_PATTERN, "$1")
}

export function renderInlineLinks(text: string): ReactNode[] {
  const nodes: ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  LINK_PATTERN.lastIndex = 0

  while ((match = LINK_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }

    const [, label, href] = match
    nodes.push(
      isExternal(href) ? (
        <a
          key={`${match.index}-${href}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:text-foreground"
        >
          {label}
        </a>
      ) : (
        <Link
          key={`${match.index}-${href}`}
          href={href}
          className="underline underline-offset-4 hover:text-foreground"
        >
          {label}
        </Link>
      )
    )

    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }

  return nodes.length ? nodes : [text]
}
