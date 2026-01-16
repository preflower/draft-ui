import type { Ora } from 'ora'
import type { Config } from '../utils/config.js'

import { createRequire } from 'node:module'
import path from 'node:path'
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
}
catch {
  try {
    pkg = require('../package.json') as PackageJson
  }
  catch {
    // pkg is already {}
  }
}

function transformImports(content: string, config: Config) {
  let res = content.replace(/@\/lib\/utils/g, config.aliases.utils)
  if (config.aliases.ui != null) {
    res = res.replace(/@\/components\/ui/g, config.aliases.ui)
  }
  if (config.aliases.draft != null) {
    res = res.replace(/@\/components\/draft/g, config.aliases.draft)
  }
  return res
}

function getTargetDir(cwd: string, config: Config, componentName: string, isRegistry: boolean) {
  // Use TitleCase for registry components to match original logic, or componentName for local
  // Note: preserving original behavior where registry used TitleCase
  const folderName = isRegistry
    ? componentName.charAt(0).toUpperCase() + componentName.slice(1)
    : componentName

  const targetBase = (config.aliases.draft ?? config.aliases.ui ?? config.aliases.components).replace('@/', 'src/')
  return path.resolve(cwd, targetBase, folderName)
}

async function installDependencies(dependencies: string[] | undefined, cwd: string, spinner: Ora) {
  if (!dependencies || dependencies.length === 0)
    return

  spinner.text = `Installing dependencies: ${dependencies.join(', ')}...`
  const { execa } = await import('execa')
  try {
    await execa('pnpm', ['add', ...dependencies], { cwd })
    spinner.succeed(chalk.green('Dependencies installed.'))
  }
  catch (err) {
    spinner.warn(chalk.yellow(`Failed to install dependencies: ${(err as Error).message}`))
  }
}

export async function addComponent(componentName: string, type: 'vue' | 'react') {
  const cwd = process.cwd()
  const config = await getConfig(cwd)

  if (!config) {
    console.log(chalk.red('\nNo components.json found. Please run init first (simulated).\n'))
    return
  }

  const spinner = ora(`Adding ${componentName}...`).start()

  try {
    const monorepoRoot = path.resolve(import.meta.url.replace('file://', ''), '../../../../')
    const sourceDir = path.resolve(
      monorepoRoot,
      'packages',
      type,
      'src',
      'components',
      componentName,
    )

    // Check if local source exists
    if (await fs.pathExists(sourceDir)) {
      const targetDir = getTargetDir(cwd, config, componentName, false)
      await fs.ensureDir(targetDir)
      await fs.copy(sourceDir, targetDir)

      const processDir = async (dir: string) => {
        const entries = await fs.readdir(dir)
        for (const entry of entries) {
          const fullPath = path.resolve(dir, entry)
          const stat = await fs.stat(fullPath)
          if (stat.isDirectory()) {
            await processDir(fullPath)
          }
          else if (stat.isFile() && /\.(?:ts|tsx|vue|js|jsx)$/.test(entry)) {
            const content = await fs.readFile(fullPath, 'utf-8')
            const transformedContent = transformImports(content, config)
            await fs.writeFile(fullPath, transformedContent)
          }
        }
      }
      await processDir(targetDir)

      // Handle dependencies from registry.json
      const registryPath = path.resolve(monorepoRoot, 'packages', type, 'src', 'registry.json')
      if (await fs.pathExists(registryPath)) {
        const registry = (await fs.readJson(registryPath)) as Registry
        const componentMeta = registry.components?.[componentName]
        if ((componentMeta?.dependencies?.length ?? 0) > 0) {
          await installDependencies(componentMeta!.dependencies, cwd, spinner)
        }
      }

      spinner.succeed(chalk.green(`Component ${componentName} added successfully to ${targetDir}`))
      return
    }

    // Check registry
    if (typeof pkg.register === 'string') {
      spinner.text = `Checking registry ${pkg.register}...`
      try {
        const registryUrl = `${pkg.register}/packages/${type}/src/registry.json`
        const registryRes = await fetch(registryUrl)
        if (!registryRes.ok)
          throw new Error(`Failed to fetch registry: ${registryRes.statusText}`)

        const registry = (await registryRes.json()) as Registry
        const componentMeta = registry.components[componentName]

        if (componentMeta == null) {
          spinner.fail(chalk.red(`Component ${componentName} not found in registry.`))
          return
        }

        if ((componentMeta.files?.length ?? 0) === 0) {
          spinner.fail(chalk.red(`Component ${componentName} has no files listed in registry.`))
          return
        }

        spinner.text = `Fetching ${componentName} files...`

        const targetDir = getTargetDir(cwd, config, componentName, true)
        await fs.ensureDir(targetDir)

        for (const file of componentMeta.files!) {
          const fileUrl = `${pkg.register}/packages/${type}/src/components/${componentName}/${file}`
          const fileRes = await fetch(fileUrl)
          if (!fileRes.ok)
            throw new Error(`Failed to fetch file ${file}: ${fileRes.statusText}`)

          const content = await fileRes.text()
          const transformedContent = transformImports(content, config)
          await fs.writeFile(path.resolve(targetDir, file), transformedContent)
        }

        if (componentMeta.dependencies?.length) {
          await installDependencies(componentMeta.dependencies, cwd, spinner)
        }

        spinner.succeed(chalk.green(`Component ${componentName} added from registry.`))
        return
      }
      catch (error) {
        spinner.fail(chalk.red(`Failed to fetch from registry: ${(error as Error).message}`))
        return
      }
    }

    spinner.fail(chalk.red(`Component ${componentName} not found for ${type}.`))
  }
  catch (error) {
    spinner.fail(chalk.red(`Failed to add component: ${error}`))
  }
}
