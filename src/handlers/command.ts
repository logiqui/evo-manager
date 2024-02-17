import type { ConsolaInstance } from 'consola'
import {
  type ApplicationCommandOptionData,
  type CommandInteraction,
  EmbedBuilder,
  type InteractionEditReplyOptions
} from 'discord.js'

import { EvolutionClient } from '@/core/client'

type DeferReplyOptions =
  | (InteractionEditReplyOptions & { ephemeral?: boolean })
  | string

export abstract class CommandHandler {
  public readonly name: string = ''
  public readonly description: string = ''
  public readonly options: ApplicationCommandOptionData[] = []
  public readonly developerOnly: boolean = false
  public readonly permissions: string[] = []

  constructor(
    protected client: EvolutionClient,
    protected logger: ConsolaInstance
  ) {}

  protected async deferredReply(
    interaction: CommandInteraction,
    options: DeferReplyOptions
  ) {
    return interaction.deferred
      ? await interaction.editReply(options)
      : await interaction.reply(options as any)
  }

  protected async error(interaction: CommandInteraction, message: string) {
    return await this.deferredReply(interaction, {
      embeds: [new EmbedBuilder({ description: message, color: 2067276 })],
      ephemeral: true
    })
  }

  protected async success(interaction: CommandInteraction, message: string) {
    return await this.deferredReply(interaction, {
      embeds: [new EmbedBuilder({ description: message, color: 10038562 })]
    })
  }

  abstract execute(interaction: CommandInteraction): Promise<void>
}
