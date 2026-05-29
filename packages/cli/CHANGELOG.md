# Changelog

## 0.2.0

### Added

- **HeroUI registry** — choose Base UI, Radix UI, or HeroUI at `elorm init` (`--ui-library heroui`)
- New components: `command`, `icon-nav-link`, `mode-toggle`, `page-footer`, `sonner`, `theme-provider`
- Dark mode docs with `ThemeProvider` + `ModeToggle` setup guide
- Docs UI library switcher (Base / Radix / HeroUI) with saved preference
- Marketing homepage HeroUI announcement and three-way primitive compare

### Changed

- Docs previews and code tabs render one library at a time (no duplicate previews)
- Site-wide theme switching via `next-themes` — mode toggles in docs update the full page
- Improved mobile layout for library tab selectors and preview badges

### Fixed

- Sonner success toast example preview
- HeroUI Preview badge contrast in light and dark mode

## 0.1.3

### Added

- `elorm info [--json]` — project config, aliases, installed components/blocks, and resolved paths (AI-friendly JSON for agent skills)
- Agent skills install hint after `elorm init`

### Notes

Install the elorm agent skill from the GitHub repo:

```bash
npx skills add Akarikev/ui --skill elorm -g -y
```

Docs: [https://ui.elorm.xyz/docs/get-started/agent-skills](https://ui.elorm.xyz/docs/get-started/agent-skills)

## 0.1.2

- Registry and CLI improvements (see git history)

## 0.1.1

- Initial public CLI releases

