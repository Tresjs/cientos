import { updateImport, updateMetadata, updatePlaygroundRoutes } from './utils'

export async function build() {
  const metadata = await updateMetadata()
  await Promise.all([
    updateImport(metadata),
    updatePlaygroundRoutes(metadata),
  ])
}
