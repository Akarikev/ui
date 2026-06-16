"use client"

import * as React from "react"
import { Slider as SliderPrimitive } from "@heroui/react"

import { cn } from "@/lib/utils"
import { focusRing, transitionBase } from "@/lib/ui-styles"

type SliderProps = React.ComponentProps<typeof SliderPrimitive.Root> & {
  trackClassName?: string
  fillClassName?: string
  thumbClassName?: string
}

function getThumbCount(value?: number | readonly number[]) {
  return Array.isArray(value) ? value.length : 1
}

function Slider({
  className,
  trackClassName,
  fillClassName,
  thumbClassName,
  orientation = "horizontal",
  value,
  defaultValue = 50,
  ...props
}: SliderProps) {
  const isVertical = orientation === "vertical"
  const thumbCount = getThumbCount(value ?? defaultValue)

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      orientation={orientation}
      value={value}
      defaultValue={defaultValue}
      className={cn(
        "relative flex touch-none select-none items-center",
        isVertical ? "h-40 w-5 flex-col" : "h-5 w-full",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "relative overflow-hidden rounded-full bg-muted/70",
          isVertical ? "h-full w-1.5" : "h-1.5 w-full",
          trackClassName
        )}
      >
        <SliderPrimitive.Fill
          data-slot="slider-fill"
          className={cn(
            "absolute rounded-full bg-primary transition-all duration-300 ease-out",
            isVertical ? "bottom-0 w-full" : "h-full",
            fillClassName
          )}
        />
        {Array.from({ length: thumbCount }).map((_, index) => (
          <SliderPrimitive.Thumb
            key={index}
            data-slot="slider-thumb"
            className={cn(
              "block size-4 rounded-full border border-primary/30 bg-background shadow-sm shadow-black/10 outline-none transition-[color,box-shadow,transform] duration-150 hover:scale-105 disabled:pointer-events-none disabled:opacity-50",
              focusRing,
              transitionBase,
              thumbClassName
            )}
          />
        ))}
      </SliderPrimitive.Track>
    </SliderPrimitive.Root>
  )
}

export { Slider }
