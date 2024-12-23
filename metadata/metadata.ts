import type { PackageIndexes } from './types'
import _metadata, { categories as _categories, components as _components } from './index.json'

export const metadata = _metadata as PackageIndexes
export const components = _components
export const categories = _categories

export const componentNames = components.map(f => f.name)
export const categoryNames = Array.from(categories)

export function getComponent(name: string) {
  return metadata.components.find(f => f.name === name)
}
