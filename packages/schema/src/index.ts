import { z } from "zod"

export const uiLibrarySchema = z.enum(["base-ui", "radix", "heroui"])
export type UiLibrary = z.infer<typeof uiLibrarySchema>

export const registryItemTypeSchema = z.enum([
  "registry:ui",
  "registry:component",
  "registry:block",
  "registry:hook",
  "registry:lib",
  "registry:theme",
  "registry:style",
  "registry:file",
  "registry:page",
  "registry:item",
])

export const registryFileSchema = z.object({
  path: z.string(),
  type: registryItemTypeSchema,
  target: z.string().optional(),
  content: z.string().optional(),
})

export const registryItemMetaSchema = z.object({
  usage: z.string().optional(),
  composition: z.array(z.string()).optional(),
  antiPatterns: z.array(z.string()).optional(),
  examples: z
    .array(
      z.object({
        title: z.string(),
        code: z.string(),
      })
    )
    .optional(),
})

export const cssVarsSchema = z.object({
  theme: z.record(z.string()).optional(),
  light: z.record(z.string()).optional(),
  dark: z.record(z.string()).optional(),
})

export const registryItemSchema = z.object({
  $schema: z.string().optional(),
  name: z.string(),
  type: registryItemTypeSchema,
  title: z.string().optional(),
  description: z.string().optional(),
  dependencies: z.array(z.string()).optional(),
  devDependencies: z.array(z.string()).optional(),
  registryDependencies: z.array(z.string()).optional(),
  files: z.array(registryFileSchema),
  cssVars: cssVarsSchema.optional(),
  css: z.record(z.string()).optional(),
  meta: registryItemMetaSchema.optional(),
  categories: z.array(z.string()).optional(),
  docs: z.string().optional(),
})

export const registrySchema = z.object({
  $schema: z.string().optional(),
  name: z.string(),
  homepage: z.string(),
  items: z.array(registryItemSchema),
})

export const themeConfigSchema = z.object({
  accent: z
    .enum([
      "default",
      "mono",
      "blue",
      "violet",
      "green",
      "orange",
      "rose",
      "amber",
      "cyan",
    ])
    .default("default"),
  radius: z.string().default("0.5"),
})

export const styleSchema = z.enum(["elorm"]).default("elorm")

export const elormConfigSchema = z.object({
  $schema: z.string().optional(),
  style: styleSchema,
  uiLibrary: uiLibrarySchema.default("base-ui"),
  rsc: z.boolean().default(true),
  tsx: z.boolean().default(true),
  tailwind: z.object({
    config: z.string().optional(),
    css: z.string(),
    baseColor: z
      .enum(["neutral", "zinc", "slate", "stone", "gray"])
      .default("neutral"),
    cssVariables: z.boolean().default(true),
  }),
  aliases: z.object({
    components: z.string(),
    utils: z.string(),
    ui: z.string(),
    lib: z.string(),
    hooks: z.string().optional(),
  }),
  iconLibrary: z.string().default("lucide"),
  registries: z
    .record(z.string())
    .default({
      "@elorm": "https://ui.elorm.xyz/r/{library}/{name}.json",
    }),
  framework: z.enum(["next", "vite", "react-router", "astro"]).default("next"),
  theme: themeConfigSchema.default({ accent: "default", radius: "default" }),
})

export type RegistryItemType = z.infer<typeof registryItemTypeSchema>
export type RegistryFile = z.infer<typeof registryFileSchema>
export type RegistryItemMeta = z.infer<typeof registryItemMetaSchema>
export type RegistryItem = z.infer<typeof registryItemSchema>
export type Registry = z.infer<typeof registrySchema>
export type ThemeConfig = z.infer<typeof themeConfigSchema>
export type ElormConfig = z.infer<typeof elormConfigSchema>

export const DEFAULT_ELORM_CONFIG: ElormConfig = {
  style: "elorm",
  uiLibrary: "base-ui",
  rsc: true,
  tsx: true,
  tailwind: {
    css: "app/globals.css",
    baseColor: "neutral",
    cssVariables: true,
  },
  aliases: {
    components: "@/components",
    utils: "@/lib/utils",
    ui: "@/components/ui",
    lib: "@/lib",
    hooks: "@/hooks",
  },
  iconLibrary: "lucide",
  registries: {
    "@elorm": "https://ui.elorm.xyz/r/{library}/{name}.json",
  },
  framework: "next",
  theme: { accent: "default", radius: "0.5" },
}

export const PACKAGE_MANAGERS = ["npm", "pnpm", "yarn", "bun"] as const
export type PackageManager = (typeof PACKAGE_MANAGERS)[number]

export function getInstallCommands(
  command: string,
  pm?: PackageManager
): Record<PackageManager, string> {
  const cmds: Record<PackageManager, string> = {
    npm: `npx ${command}`,
    pnpm: `pnpm dlx ${command}`,
    yarn: `yarn dlx ${command}`,
    bun: `bunx ${command}`,
  }
  if (pm) return { [pm]: cmds[pm] } as Record<PackageManager, string>
  return cmds
}
