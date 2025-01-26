import { updateImport, updateMetadata, updatePlaygroundRoutes } from './utils'

async function run() {
  const metadata = await updateMetadata()
  await Promise.all([
    updateImport(metadata),
    updatePlaygroundRoutes(metadata),
  ])
}

await run()
