import { CommandInteraction } from 'discord.js'

import { EvolutionClient } from '@/client'
import { CommandHandler } from '@/structures/command'

export default class PingCommand extends CommandHandler {
  constructor(client: EvolutionClient) {
    super({
      name: 'ping',
      description: 'ping server'
    })
  }

  public async execute(
    client: EvolutionClient,
    interaction: CommandInteraction
  ) {
    interaction.reply({
      content: `O ping do bot é \`${client.ws.ping}\`ms.`,
      ephemeral: true
    })
  }
}
