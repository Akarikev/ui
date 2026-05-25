import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4">
        <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            Built by{" "}
            <a
              href="https://x.com/elorm_elom"
              className="text-foreground/80 hover:text-foreground underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              elorm
            </a>{" "}
            from 🇬🇭. Open source on{" "}
            <a
              href="https://github.com/Akarikev/ui"
              className="text-foreground/80 hover:text-foreground underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            .
          </p>
          <Link
            href="/docs"
            className="text-sm text-muted-foreground hover:text-foreground underline"
          >
            Docs
          </Link>
        </div>
      </div>
    </footer>
  )
}
