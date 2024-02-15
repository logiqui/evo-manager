import { CacheType, CommandInteraction } from 'discord.js'

import { EvolutionClient } from '@/client'
import { Command } from '@/structures/command'

export default class PingCommand extends Command {
  constructor(client: EvolutionClient) {
    super(client, {
      name: 'ping',
      description: 'ping server'
    })
  }

  async run(interaction: CommandInteraction) {
    interaction.reply({
      content: `O ping do bot é \`${this.client.ws.ping}\`ms.`,
      ephemeral: true
    })
  }
}
