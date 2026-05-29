import { PrimitiveDemo } from "@/components/demos/primitive-demo"
import type { PrimitiveId } from "@/lib/ui-library"

export function createPrimitivePreviewDemos(component: PrimitiveId) {
  return {
    base: () => <PrimitiveDemo component={component} library="base-ui" />,
    radix: () => <PrimitiveDemo component={component} library="radix" />,
    heroui: () => <PrimitiveDemo component={component} library="heroui" />,
  }
}
