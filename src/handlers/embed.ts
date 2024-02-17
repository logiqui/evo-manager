import { CommandInteraction, EmbedBuilder } from 'discord.js'

import { DeferReplyOptions } from '@/core/types'

export class EmbedInteraction {
  async deferredReply(
    interaction: CommandInteraction,
    options: DeferReplyOptions
  ) {
    interaction.deferred
      ? await interaction.editReply(options)
      : await interaction.reply(options as any)
  }

  async deferError(interaction: CommandInteraction, message: string) {
    return await this.deferredReply(interaction, {
      embeds: [new EmbedBuilder({ description: message, color: 10038562 })],
      ephemeral: true
    })
  }

  async deferSuccess(interaction: CommandInteraction, message: string) {
    return await this.deferredReply(interaction, {
      embeds: [new EmbedBuilder({ description: message, color: 2067276 })]
    })
  }
}
