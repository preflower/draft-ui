import { createRequire } from 'module'
import path from 'path'

import chalk from 'chalk'
import fs from 'fs-extra'
import ora from 'ora'

import { getConfig } from '../utils/config.js'

const require = createRequire(import.meta.url)

interface RegistryComponent {
  dependencies: string[]
  files?: string[]
}

interface Registry {
  components: Record<string, RegistryComponent>
}

interface PackageJson {
  register?: string
  [key: string]: unknown
}

let pkg: PackageJson = {}

try {
  pkg = require('../../package.json') as PackageJson
} catch {
  try {
    pkg = require('../package.json') as PackageJson
  } catch {
    // pkg is already {}
  }
}

export async function addComponent (componentName: string, type: 'vue' | 'react') {
  const cwd = process.cwd()
  const config = await getConfig(cwd)

  if (!config) {
    console.log(chalk.red('\nNo components.json found. Please run init first (simulated).\n'))
    // For now, we'll just use defaults if no config is found to demonstrate
    return
  }

  const spinner = ora(`Adding ${componentName}...`).start()

  try {
    // Determine source path within monorepo
    // In a real scenario, this would fetch from a registry or use a relative path in dev
    // For this demo, we'll assume the CLI is run from the monorepo root or we know where the packages are
    const monorepoRoot = path.resolve(import.meta.url.replace('file://', ''), '../../../../')
    const sourceDir = path.resolve(
      monorepoRoot,
      'packages',
      type,
      'src',
      'components',
      componentName
    )

    if (!(await fs.pathExists(sourceDir))) {
      if (typeof pkg.register === 'string') {
        spinner.text = `Checking registry ${pkg.register}...`
        try {
          const registryUrl = `${pkg.register}/packages/${type}/src/registry.json`
          const registryRes = await fetch(registryUrl)
          if (!registryRes.ok) {
            throw new Error(`Failed to fetch registry from ${registryUrl}: ${registryRes.statusText}`)
          }
          const registry = (await registryRes.json()) as Registry
          const componentMeta = registry.components[componentName]

          if (componentMeta == null) {
            spinner.fail(chalk.red(`Component ${componentName} not found in registry.`))
            return
          }

          if (!componentMeta.files || !Array.isArray(componentMeta.files)) {
            spinner.fail(chalk.red(`Component ${componentName} has no files listed in registry.`))
            return
          }

          spinner.text = `Fetching ${componentName} files...`

          const titleCaseComponentName = componentName.charAt(0).toUpperCase() + componentName.slice(1)

          // Determine target path using config aliases
          // Use the ui alias if available, otherwise fallback to components
          const targetBase = (config.aliases.draft ?? config.aliases.ui ?? config.aliases.components).replace('@/', 'src/')
          const targetDir = path.resolve(cwd, targetBase, titleCaseComponentName) // Use TitleCase for directory

          await fs.ensureDir(targetDir)

          for (const file of componentMeta.files) {
            const fileUrl = `${pkg.register}/packages/${type}/src/components/${componentName}/${file}`
            const fileRes = await fetch(fileUrl)
            if (!fileRes.ok) {
              throw new Error(`Failed to fetch file ${file}: ${fileRes.statusText}`)
            }
            const content = await fileRes.text()
            await fs.writeFile(path.resolve(targetDir, file), content)
          }

          // Handle dependencies
          if (componentMeta.dependencies != null && componentMeta.dependencies.length > 0) {
            spinner.text = `Installing dependencies for ${componentName}: ${componentMeta.dependencies.join(', ')}...`
            const { execa } = await import('execa')
            try {
              await execa('pnpm', ['add', ...componentMeta.dependencies], { cwd })
            } catch (err) {
              spinner.warn(chalk.yellow(`Component added, but failed to install dependencies: ${(err as Error).message}`))
            }
          }

          spinner.succeed(chalk.green(`Component ${componentName} added from registry.`))
          return
        } catch (error) {
          spinner.fail(chalk.red(`Failed to fetch from registry: ${(error as Error).message}`))
          return
        }
      }

      spinner.fail(chalk.red(`Component ${componentName} not found for ${type}.`))
      return
    }

    // Determine target path using config aliases
    // Use the ui alias if available, otherwise fallback to components
    const targetBase = (config.aliases.draft ?? config.aliases.ui ?? config.aliases.components).replace('@/', 'src/')
    const targetDir = path.resolve(cwd, targetBase, componentName)

    await fs.ensureDir(targetDir)
    await fs.copy(sourceDir, targetDir)

    // Handle dependencies from registry.json
    const registryPath = path.resolve(monorepoRoot, 'packages', type, 'src', 'registry.json')
    if (await fs.pathExists(registryPath)) {
      const registry = await fs.readJson(registryPath)
      const componentMeta = registry.components[componentName]

      if (componentMeta?.dependencies?.length > 0) {
        spinner.text = `Installing dependencies for ${componentName}: ${componentMeta.dependencies.join(', ')}...`

        // Detect package manager (assuming pnpm for now as per project requirements)
        const { execa } = await import('execa')
        try {
          await execa('pnpm', ['add', ...componentMeta.dependencies], { cwd })
          spinner.succeed(chalk.green(`Component ${componentName} and its dependencies added successfully.`))
          return
        } catch (err) {
          spinner.warn(chalk.yellow(`Component copied, but failed to install dependencies: ${(err as Error).message}`))
          return
        }
      }
    }

    spinner.succeed(chalk.green(`Component ${componentName} added successfully to ${targetDir}`))
  } catch (error) {
    spinner.fail(chalk.red(`Failed to add component: ${error}`))
  }
}
