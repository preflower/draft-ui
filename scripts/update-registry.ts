import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const COMPONENTS_DIR = path.resolve(__dirname, '../packages/vue/src/components')
const REGISTRY_PATH = path.resolve(__dirname, '../packages/vue/src/registry.json')

function getDependencies(content: string): string[] {
  const deps = new Set<string>()
  const importRegex = /from\s+['"]([^'"]+)['"]/g

  let match = importRegex.exec(content)
  while (match !== null) {
    const dep = match[1]
    if (!dep.startsWith('.') && !dep.startsWith('@/')) {
      deps.add(dep)
    }
    match = importRegex.exec(content)
  }
  return Array.from(deps)
}

function updateRegistry() {
  if (!fs.existsSync(COMPONENTS_DIR)) {
    console.error('Components directory not found:', COMPONENTS_DIR)
    return
  }

  const components = fs.readdirSync(COMPONENTS_DIR).filter((file) => {
    return fs.statSync(path.join(COMPONENTS_DIR, file)).isDirectory()
  })

  const registry: Record<string, any> = fs.existsSync(REGISTRY_PATH)
    ? JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf-8'))
    : { components: {} }

  components.forEach((component) => {
    const componentDir = path.join(COMPONENTS_DIR, component)
    const files = fs.readdirSync(componentDir)

    const componentFiles = files.filter(f => f.endsWith('.vue') || f.endsWith('.ts'))
    const allDependencies = new Set<string>()

    componentFiles.forEach((file) => {
      const content = fs.readFileSync(path.join(componentDir, file), 'utf-8')
      const deps = getDependencies(content)
      deps.forEach(d => allDependencies.add(d))
    })

    registry.components[component] = {
      dependencies: Array.from(allDependencies).sort(),
      files: componentFiles,
    }

    console.log(`Updated registry for: ${component}`)
  })

  fs.writeFileSync(REGISTRY_PATH, `${JSON.stringify(registry, null, 2)}\n`)
  console.log('Registry updated successfully at:', REGISTRY_PATH)
}

updateRegistry()
