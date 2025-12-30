import path from 'path'

import chalk from 'chalk'
import fs from 'fs-extra'
import ora from 'ora'

const DEFAULT_CONFIG = {
  style: 'default',
  rsc: false,
  tsx: true,
  tailwind: {
    config: 'tailwind.config.js',
    css: 'src/index.css',
    baseColor: 'slate',
    cssVariables: true
  },
  aliases: {
    components: '@/components',
    utils: '@/lib/utils',
    ui: '@/components/ui',
    draft: '@/components/draft'
  }
}

export async function initProject () {
  const cwd = process.cwd()
  const configPath = path.resolve(cwd, 'components.json')

  if (await fs.pathExists(configPath)) {
    console.log(chalk.yellow('\ncomponents.json already exists.\n'))
    return
  }

  const spinner = ora('Initializing project...').start()

  try {
    await fs.writeJson(configPath, DEFAULT_CONFIG, { spaces: 2 })
    spinner.succeed(chalk.green('Initialized components.json successfully!'))
  } catch (error) {
    spinner.fail(chalk.red(`Failed to initialize project: ${error}`))
  }
}
