import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-white/40">
          Built by{" "}
          <Link href="/" className="text-white/60 hover:text-white">
            elorm/ui
          </Link>
          . Open source on{" "}
          <a
            href="https://github.com/Akarikev/ui"
            className="text-white/60 hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
        </p>
        <div className="flex gap-6 text-sm text-white/40">
          <Link href="/docs" className="hover:text-white/70">
            Docs
          </Link>
          <a
            href="https://elorm.xyz"
            className="hover:text-white/70"
            target="_blank"
            rel="noopener noreferrer"
          >
            elorm.xyz
          </a>
        </div>
      </div>
    </footer>
  )
}
