export interface CientosComponent {
  name: string
  package: string
  category: string
  component: string
  path: string
  docs?: string
  demo?: string
  playground?: string
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
