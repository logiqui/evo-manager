import { CommandInteraction } from 'discord.js'

import { EventHandler } from '@/handlers/event'
import { Events } from '@/lib/types'

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
