import path from 'node:path'

import fs from 'fs-extra'
import { z } from 'zod'

export const configSchema = z.object({
  typescript: z.boolean(),
  tailwind: z.object({
    config: z.string(),
    css: z.string(),
    baseColor: z.string(),
    cssVariables: z.boolean(),
  }),
  aliases: z.object({
    components: z.string(),
    utils: z.string(),
    ui: z.string().optional(),
    draft: z.string().optional(),
  }),
})

export type Config = z.infer<typeof configSchema>

export async function getConfig(cwd: string) {
  const configPath = path.resolve(cwd, 'components.json')
  if (!(await fs.pathExists(configPath))) {
    return null
  }

  try {
    const config = await fs.readJson(configPath)
    return configSchema.parse(config)
  }
  catch (error) {
    throw new Error(`Invalid configuration: ${error}`)
  }
}
