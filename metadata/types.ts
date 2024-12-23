export interface CientosComponent {
  name: string
  category: string
  componentPath: string
  package: string
  demoPath?: string
  playgroundPath?: string
}

export interface PackageIndexes {
  categories: string[]
  components: CientosComponent[]
}
