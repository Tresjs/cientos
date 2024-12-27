export interface CientosComponent {
  name: string
  package: string
  category: string
  component: string
  docs?: string
  demo?: string
  playground?: string
  related?: CientosComponent['name'][]
  deprecated?: boolean
  internal?: boolean
}

export interface PackageIndexes {
  categories: string[]
  components: CientosComponent[]
}
