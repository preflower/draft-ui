import { createRequire } from 'node:module'

import { Command } from 'commander'

import { addComponent } from '../commands/add.js'
import { initProject } from '../commands/init.js'

const require = createRequire(import.meta.url)
interface PackageJson {
  version: string
  [key: string]: unknown
}

let pkg: PackageJson = { version: '0.0.1' }

try {
  pkg = require('../../package.json')
}
catch {
  try {
    pkg = require('../package.json')
  }
  catch {
    pkg = { version: '0.0.1' }
  }
}

const program = new Command()

program
  .name('draft-cli')
  .description('CLI for adding components to your projects')
  .version(pkg.version)

program
  .command('init')
  .description('initialize your project and create a components.json file')
  .action(async () => {
    await initProject()
  })

const vue = program.command('vue').description('Vue components commands')

vue
  .command('add')
  .description('add a Vue component to your project')
  .argument('<component>', 'the component to add')
  .action(async (component) => {
    await addComponent(component, 'vue')
  })

const react = program.command('react').description('React components commands')

react
  .command('add')
  .description('add a React component to your project')
  .argument('<component>', 'the component to add')
  .action(async (component) => {
    await addComponent(component, 'react')
  })

program.parse()
