"use client"

import * as React from "react"
import type { LucideIcon } from "lucide-react"
import {
  ArrowUpIcon,
  BoxesIcon,
  ChevronDownIcon,
  MicIcon,
  PaperclipIcon,
  PlusIcon,
  SparklesIcon,
  WandSparklesIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { softShadow, transitionBase } from "@/lib/ui-styles"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"

export type PromptComposerSuggestion = {
  label: string
  prompt?: string
}

export type PromptComposerAction = {
  label: string
  icon: LucideIcon
  onClick?: () => void
}

const defaultSuggestions: PromptComposerSuggestion[] = [
  { label: "Web", prompt: "Build a responsive web app for " },
  { label: "Mobile", prompt: "Design a mobile app flow for " },
  { label: "Slack Bot", prompt: "Create a Slack bot that " },
  { label: "AI Agent", prompt: "Build an AI agent that " },
  { label: "Chrome Extension", prompt: "Make a Chrome extension that " },
]

const defaultActions: PromptComposerAction[] = [
  { label: "Templates", icon: BoxesIcon },
  { label: "Improve prompt", icon: WandSparklesIcon },
  { label: "Generate plan", icon: SparklesIcon },
]

function PromptComposer({
  className,
  defaultValue = "",
  placeholder = "Ask your agent to build a product...",
  variant = "default",
  suggestions = defaultSuggestions,
  actions = defaultActions,
  submitLabel = "Submit prompt",
  attachLabel = "Attach file",
  modeLabel = "Auto",
  voiceLabel = "Voice input",
  onAttach,
  onModeClick,
  onVoiceClick,
  onPromptSubmit,
  onSuggestionSelect,
  ...props
}: Omit<React.ComponentProps<"form">, "onSubmit"> & {
  defaultValue?: string
  placeholder?: string
  variant?: "default" | "follow-up"
  suggestions?: PromptComposerSuggestion[]
  actions?: PromptComposerAction[]
  submitLabel?: string
  attachLabel?: string
  modeLabel?: string
  voiceLabel?: string
  onAttach?: () => void
  onModeClick?: () => void
  onVoiceClick?: () => void
  onPromptSubmit?: (prompt: string) => void
  onSuggestionSelect?: (suggestion: PromptComposerSuggestion) => void
}) {
  const id = React.useId()
  const [prompt, setPrompt] = React.useState(defaultValue)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedPrompt = prompt.trim()
    if (!trimmedPrompt) return

    onPromptSubmit?.(trimmedPrompt)
  }

  function handleSuggestionClick(suggestion: PromptComposerSuggestion) {
    if (suggestion.prompt) {
      setPrompt(suggestion.prompt)
    }

    onSuggestionSelect?.(suggestion)
  }

  if (variant === "follow-up") {
    return (
      <form
        data-slot="prompt-composer"
        data-variant="follow-up"
        className={cn("mx-auto w-full max-w-2xl", className)}
        onSubmit={handleSubmit}
        {...props}
      >
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor={id} className="sr-only">
              Prompt
            </FieldLabel>
            <div
              className={cn(
                "flex min-h-12 items-center gap-2 rounded-full border border-border/60 bg-card p-1.5 text-card-foreground",
                "focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/40",
                softShadow,
                transitionBase
              )}
            >
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label={attachLabel}
                title={attachLabel}
                className="rounded-full text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                onClick={onAttach}
              >
                <PlusIcon data-icon="inline-start" />
              </Button>
              <input
                id={id}
                value={prompt}
                placeholder={placeholder}
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                onChange={(event) => setPrompt(event.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="rounded-full px-2.5 text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                onClick={onModeClick}
              >
                {modeLabel}
                <ChevronDownIcon data-icon="inline-end" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label={voiceLabel}
                title={voiceLabel}
                className="rounded-full bg-muted text-foreground hover:bg-muted/80"
                onClick={onVoiceClick}
              >
                <MicIcon data-icon="inline-start" />
              </Button>
            </div>
          </Field>
        </FieldGroup>
      </form>
    )
  }

  return (
    <form
      data-slot="prompt-composer"
      className={cn("mx-auto flex w-full max-w-3xl flex-col gap-4", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor={id} className="sr-only">
            Prompt
          </FieldLabel>
          <div
            className={cn(
              "rounded-2xl border border-border/60 bg-card p-3 text-card-foreground",
              "focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/40",
              softShadow,
              transitionBase
            )}
          >
            <textarea
              id={id}
              value={prompt}
              placeholder={placeholder}
              className="min-h-28 w-full resize-none bg-transparent px-1 py-2 text-base outline-none placeholder:text-muted-foreground md:text-sm"
              onChange={(event) => setPrompt(event.target.value)}
            />
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {actions.map((action) => {
                  const Icon = action.icon

                  return (
                    <Button
                      key={action.label}
                      type="button"
                      variant="soft-outline"
                      size="icon-sm"
                      aria-label={action.label}
                      title={action.label}
                      onClick={action.onClick}
                    >
                      <Icon data-icon="inline-start" />
                    </Button>
                  )
                })}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="soft-outline"
                  size="icon-sm"
                  aria-label={attachLabel}
                  title={attachLabel}
                  onClick={onAttach}
                >
                  <PaperclipIcon data-icon="inline-start" />
                </Button>
                <Button
                  type="submit"
                  size="icon-sm"
                  aria-label={submitLabel}
                  title={submitLabel}
                  disabled={!prompt.trim()}
                >
                  <ArrowUpIcon data-icon="inline-start" />
                </Button>
              </div>
            </div>
          </div>
        </Field>
      </FieldGroup>
      {suggestions.length ? (
        <div className="flex flex-wrap justify-center gap-3">
          {suggestions.map((suggestion) => (
            <Button
              key={suggestion.label}
              type="button"
              variant="soft-outline"
              size="sm"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.label}
            </Button>
          ))}
        </div>
      ) : null}
    </form>
  )
}

export { PromptComposer }
