# elorm/ui CLI - Library Selection

## Overview

The CLI now supports flexible UI library selection, allowing users to mix and match Base UI and Radix components or stick with their preference.

## Usage Examples

### Default (from config)

```bash
bunx elorm add button card input
# Uses uiLibrary from elorm.json
```

### Override with Flag

```bash
# Try Radix version of button
bunx elorm add button --library radix

# Try Base UI version of dialog
bunx elorm add dialog --library base-ui
```

### Interactive Selection

```bash
bunx elorm add tabs alert --interactive

# Shows menu:
# ┌ Which UI library would you like to use?
# │
# │ ◯ Base UI - Modern, lightweight primitives from MUI
# │ ◯ Radix UI - Battle-tested, accessible components
# │ ◯ Use config default (base-ui) - From elorm.json
# │
# └
```

## Use Cases

1. **Consistent Project** - Set `uiLibrary` in `elorm.json`, use default
2. **Experimenting** - Use `--interactive` to try both libraries
3. **Mixed Approach** - Use `--library` flag to mix components from both
4. **CI/CD** - Use `--library` flag for deterministic builds

## Benefits

- ✅ Flexibility to try both libraries
- ✅ Easy A/B testing of components
- ✅ Mix Base UI and Radix in same project
- ✅ Clear, beautiful CLI prompts
- ✅ Config file remains source of truth

