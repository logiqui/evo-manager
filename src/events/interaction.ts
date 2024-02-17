import { colorize } from 'consola/utils'
import type { CommandInteraction, GuildMember } from 'discord.js'

import { Events } from '@/core/types'
import { EventHandler } from '@/handlers/event'

export default class InteractionCreateEvent extends EventHandler<Events.InteractionCreate> {
  public readonly name = Events.InteractionCreate

  async execute(interaction: CommandInteraction) {
    const member = interaction.member as GuildMember
    const command = this.client.commands.get(interaction.commandName)

    if (!command || !interaction.inGuild() || !interaction.isCommand()) {
      return
    }

    if (
      command.permissions.length > 0 &&
      !command.permissions.some((role) => member.roles.cache.has(role))
    ) {
      this.logger.log(
        `${interaction.user.tag} used ${colorize('redBright', `/${command.name}`)} without permission`
      )

      return await this.embeds.deferError(
        interaction,
        '**you dont have permissions to use this command**'
      )
    }

    this.logger.log(
      `${colorize('bold', interaction.user.tag)} used ${colorize('redBright', `/${command.name}`)}`
    )

    await command.execute(interaction)
  }
}
