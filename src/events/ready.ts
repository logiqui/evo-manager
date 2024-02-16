import { colorize } from 'consola/utils'
import { Client } from 'discord.js'

import { EventHandler } from '@/structures/event'
import { Events } from '@/types'

export default class ReadyEvent extends EventHandler<Events.Ready> {
  public readonly name = Events.Ready
  public readonly once = true

  async execute(_client: Client<true>) {
    this.client.registryCommands()

    this.logger.box({
      title: ` ${colorize('redBright', 'Evolution Bot Manager')} `,
      message: [
        `${colorize('redBright', this.client.user!.tag)} with id ${colorize('redBright', this.client.user!.id)}\n`,
        `${colorize(
          'redBright',
          this.client.guilds.cache
            .map((guild) => guild.memberCount)
            .reduce((total, count) => total + count, 0)
        )} users in ${colorize('redBright', this.client.guilds.cache.size)} servers`,
        `${colorize('redBright', this.client.events.size)} events loaded successfully`,
        `${colorize('redBright', this.client.commands.size)} commands loaded successfully`
      ].join('\n')
    })
  }
}
