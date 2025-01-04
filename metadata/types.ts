export interface CientosComponent {
  name: string
  package: string
  category: string
  component?: string
  fn?: string
  path: string
  docs?: string
  demo?: string
  playgrounds?: string[]
  alias?: string[]
  related?: CientosComponent['name'][]
  deprecated?: boolean
  internal?: boolean
}

export interface PackageIndexes {
  packages: Record<string, CientosPackage>
  categories: string[]
  components: CientosComponent[]
}

export interface CientosPackage {
  name: string
  dir: string
  categories: string[]
  components: CientosComponent[]
}
