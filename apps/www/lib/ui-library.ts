export type UiLibrary = "base-ui" | "radix"

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
  ]

export const PRIMITIVE_COMPONENTS = [
  {
    id: "button",
    title: "Button",
    basePackage: "@base-ui/react",
    radixPackage: "@radix-ui/react-slot",
  },
  {
    id: "checkbox",
    title: "Checkbox",
    basePackage: "@base-ui/react",
    radixPackage: "@radix-ui/react-checkbox",
  },
  {
    id: "switch",
    title: "Switch",
    basePackage: "@base-ui/react",
    radixPackage: "@radix-ui/react-switch",
  },
  {
    id: "select",
    title: "Select",
    basePackage: "@base-ui/react",
    radixPackage: "@radix-ui/react-select",
  },
  {
    id: "dialog",
    title: "Dialog",
    basePackage: "@base-ui/react",
    radixPackage: "@radix-ui/react-dialog",
  },
  {
    id: "tooltip",
    title: "Tooltip",
    basePackage: "@base-ui/react",
    radixPackage: "@radix-ui/react-tooltip",
  },
] as const

export type PrimitiveId = (typeof PRIMITIVE_COMPONENTS)[number]["id"]
