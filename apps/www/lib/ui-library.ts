export type UiLibrary = "base-ui" | "radix" | "heroui"

export const UI_LIBRARIES: { id: UiLibrary; label: string; description: string }[] =
  [
    {
      id: "base-ui",
      label: "Base UI",
      description: "Modern unstyled primitives from the Base UI team.",
    },
    {
      id: "radix",
      label: "Radix UI",
      description: "Battle-tested, widely adopted headless components.",
    },
    {
      id: "heroui",
      label: "HeroUI",
      description: "React Aria + Tailwind v4 with elorm wrapper styling.",
    },
  ]

export const PRIMITIVE_COMPONENTS = [
  {
    id: "button",
    title: "Button",
    basePackage: "@base-ui/react",
    radixPackage: "@radix-ui/react-slot",
    herouiPackage: "@heroui/react",
  },
  {
    id: "checkbox",
    title: "Checkbox",
    basePackage: "@base-ui/react",
    radixPackage: "@radix-ui/react-checkbox",
    herouiPackage: "@heroui/react",
  },
  {
    id: "switch",
    title: "Switch",
    basePackage: "@base-ui/react",
    radixPackage: "@radix-ui/react-switch",
    herouiPackage: "@heroui/react",
  },
  {
    id: "select",
    title: "Select",
    basePackage: "@base-ui/react",
    radixPackage: "@radix-ui/react-select",
    herouiPackage: "@heroui/react",
  },
  {
    id: "dialog",
    title: "Dialog",
    basePackage: "@base-ui/react",
    radixPackage: "@radix-ui/react-dialog",
    herouiPackage: "@heroui/react",
  },
  {
    id: "tooltip",
    title: "Tooltip",
    basePackage: "@base-ui/react",
    radixPackage: "@radix-ui/react-tooltip",
    herouiPackage: "@heroui/react",
  },
] as const

export type PrimitiveId = (typeof PRIMITIVE_COMPONENTS)[number]["id"]
