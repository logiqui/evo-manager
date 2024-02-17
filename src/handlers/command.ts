import type { ConsolaInstance } from 'consola'
import {
  type ApplicationCommandOptionData,
  type CommandInteraction
} from 'discord.js'

import { EvolutionClient } from '@/core/client'
import { EmbedInteraction } from '@/handlers/embed'

export abstract class CommandHandler {
  public readonly name: string = ''
  public readonly description: string = ''
  public readonly options: ApplicationCommandOptionData[] = []
  public readonly developerOnly: boolean = false
  public readonly permissions: string[] = []

  constructor(
    protected client: EvolutionClient,
    protected logger: ConsolaInstance,
    protected embeds: EmbedInteraction
  ) {}

  abstract execute(interaction: CommandInteraction): Promise<void>
}
