import { Command } from 'commander'

import { addComponent } from '../commands/add.js'
import { initProject } from '../commands/init.js'

const program = new Command()

program
  .name('draft-vue')
  .description('CLI for adding Vue components')
  .version('0.0.1')

program
  .command('add')
  .description('add a component to your project')
  .argument('<component>', 'the component to add')
  .action(async (component) => {
    await addComponent(component, 'vue')
  })

program
  .command('init')
  .description('initialize your project and create a components.json file')
  .action(async () => {
    await initProject()
  })

program.parse()
