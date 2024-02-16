import { colorize } from 'consola/utils'
import { ClientEvents } from 'discord.js'

import { EvolutionClient } from '@/client'
import { EventHandler } from '@/structures/event'

export default class ReadyEvent extends EventHandler {
  constructor() {
    super({
      name: 'ready',
      once: true
    })
  }

  public async execute(
    client: EvolutionClient,
    _clientEvent: ClientEvents['ready']
  ) {
    await client.registryCommands()

    client.logger.box({
      title: ` ${colorize('redBright', 'Evolution Bot Manager')} `,
      message: [
        `${colorize('redBright', client.user!.tag)} with id ${colorize('redBright', client.user!.id)}\n`,
        `${colorize(
          'redBright',
          client.guilds.cache
            .map((guild) => guild.memberCount)
            .reduce((total, count) => total + count, 0)
        )} users in ${colorize('redBright', client.guilds.cache.size)} servers`,
        `${colorize('redBright', client.events.size)} events loaded successfully`,
        `${colorize('redBright', client.commands.size)} commands loaded successfully`
      ].join('\n')
    })
  }
}
