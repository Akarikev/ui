import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared"

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: "elorm/ui",
      url: "/",
    },
    links: [
      {
        text: "GitHub",
        url: "https://github.com/Akarikev/ui",
        external: true,
      },
    ],
  }
}
