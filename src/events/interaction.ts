import { CommandInteraction } from 'discord.js'

import { EventHandler } from '@/structures/event'
import { Events } from '@/types'

export default class InteractionCreateEvent extends EventHandler<Events.InteractionCreate> {
  public readonly name = Events.InteractionCreate

  async execute(interaction: CommandInteraction) {
    const command = this.client.commands.get(interaction.commandName)

    if (command) {
      command.execute(interaction)
    }
  }
}
