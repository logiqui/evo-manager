import { CommandInteraction } from 'discord.js'

import { Events } from '@/core/types'
import { EventHandler } from '@/handlers/event'

export default class InteractionCreateEvent extends EventHandler<Events.InteractionCreate> {
  public readonly name = Events.InteractionCreate

  async execute(interaction: CommandInteraction) {
    const command = this.client.commands.get(interaction.commandName)
    if (!command || !interaction.inGuild() || !interaction.isCommand()) {
      return
    }

    await command.execute(interaction)
  }
}
