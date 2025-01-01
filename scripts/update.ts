import { updateDocs, updateImport, updateMetadata, updatePlaygroundRoutes } from './utils'

async function run() {
  const metadata = await updateMetadata()
  await Promise.all([
    updateImport(metadata),
    updatePlaygroundRoutes(metadata),
    updateDocs(metadata),
    /*
    updatePackageREADME(metadata),
    updateIndexREADME(metadata),
    updateFunctionsMD(metadata),
    updateFunctionREADME(metadata),
    updatePackageJSON(metadata),
    updateCountBadge(metadata),
    process.env.NETLIFY && updateContributors(),
    */
  ])

  // await fs.copyFile('./CONTRIBUTING.md', './packages/contributing.md')
}

run()
