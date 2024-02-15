import type {
  ApplicationCommandOptionData,
  CommandInteraction
} from 'discord.js'

import { EvolutionClient } from '@/client'

export interface CommandArgs {
  name: string
  description: string
  options?: ApplicationCommandOptionData[]
  developerOnly?: boolean
  permissions?: string[]
}

export class Command {
  client: EvolutionClient
  name: string
  description: string
  options?: ApplicationCommandOptionData[]
  developerOnly?: boolean
  permissions?: string[]

  constructor(client: EvolutionClient, options: CommandArgs) {
    this.client = client
    this.name = options.name
    this.description = options.description
    this.options = options.options
    this.developerOnly = options.developerOnly
    this.permissions = options.permissions
  }
}
