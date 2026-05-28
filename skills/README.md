# elorm/ui Agent Skills

Installable skills that teach AI agents how to work with elorm/ui projects.

## Install

```bash
npx skills add Akarikev/ui --skill elorm -g -y
```

Install the maintainer skill (monorepo contributors):

```bash
npx skills add Akarikev/ui --skill elorm-maintainer -g -y
```

Install both:

```bash
npx skills add Akarikev/ui --all -g -y
```

## Skills

| Skill | For | Triggers |
| --- | --- | --- |
| `elorm` | App developers using elorm/ui | `elorm.json`, `npx elorm add`, composing/fixing UI |
| `elorm-maintainer` | Monorepo contributors | editing registry, docs, CLI, `registry.json` |

## What `elorm` covers

- Live project context via `npx elorm info --json`
- Per-component docs via `npx elorm docs <name> --json`
- Elorm-specific styling (Field/FieldGroup, data-icon, ui-styles, soft identity)
- Base UI vs Radix primitive differences
- Full CLI reference (init, add, search, diff)
- Composition rules and component selection

## Discoverability

Skills appear on [skills.sh](https://skills.sh) automatically when users install via `npx skills add`. No manual submission required.

After merging to `main`, verify:

```bash
npx skills add Akarikev/ui --list
```

## Updating skills

When changing CLI flags, registry meta, or style rules, update the matching files under `skills/` and mention it in [CONTRIBUTING.md](../CONTRIBUTING.md).
