import type { ConsolaInstance } from 'consola'
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

export abstract class CommandHandler {
  public abstract readonly name: string
  public abstract readonly description: string
  public readonly options: ApplicationCommandOptionData[] = []
  public readonly developerOnly: boolean = false
  public readonly permissions: string[] = []

  constructor(
    protected client: EvolutionClient,
    protected logger: ConsolaInstance
  ) {}

  async execute(interaction: CommandInteraction) {}
}
