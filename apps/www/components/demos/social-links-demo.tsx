import { SocialLinks } from "@/components/ui/social-links"

export function SocialLinksDemo() {
  return (
    <SocialLinks
      links={[
        { platform: "github", href: "https://github.com/Akarikev/ui" },
        { platform: "x", href: "https://x.com" },
        { platform: "mastodon", href: "https://mastodon.social" },
        { platform: "bluesky", href: "https://bsky.app" },
        { platform: "reddit", href: "https://reddit.com" },
        { platform: "discord", href: "https://discord.com" },
      ]}
    />
  )
}
