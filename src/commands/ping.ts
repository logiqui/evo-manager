import { CommandInteraction } from 'discord.js'

import { CommandHandler } from '@/handlers/command'

export default class PingCommand extends CommandHandler {
  public readonly name = 'ping'
  public readonly description = 'ping server ms'

  async execute(interaction: CommandInteraction) {
    interaction.reply({
      content: `O ping do bot é \`${this.client.ws.ping}\`ms.`,
      ephemeral: true
    })
  }
}
