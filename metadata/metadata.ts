import type { PackageIndexes } from './types'
import _metadata from './index.json'

export const metadata = _metadata as PackageIndexes
export const components = metadata.components
export const categories = metadata.categories

export const componentNames = components.map(f => f.name)
export const categoryNames = Array.from(categories)

export function getComponent(name: string) {
  return components.find(f => f.name === name)
}
