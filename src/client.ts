import { createConsola } from 'consola'
import { Client, ClientOptions, Collection } from 'discord.js'
import { readdirSync } from 'fs'
import { join } from 'path'

import { CommandHandler } from '@/handlers/command'
import { EventHandler } from '@/handlers/event'

export class EvolutionClient extends Client {
  public readonly commands = new Collection<string, CommandHandler>()
  public readonly events = new Collection<string, EventHandler>()
  public readonly logger = createConsola({
    formatOptions: {
      columns: 10,
      date: true,
      compact: true
    }
  })

  constructor(options: ClientOptions) {
    super(options)
  }

  async registryCommands() {
    for (const [_, guild] of this.guilds.cache) {
      await guild.commands.fetch()

      guild.commands.cache.forEach((command) => {
        guild.commands.delete(command.id)
      })

      guild.commands.set(toApplicationCommand(this.commands))
    }
  }

  async loadCommands(path: string = 'src/commands') {
    const commands = readdirSync(path).filter((file) => file.endsWith('.ts'))

    for (const command of commands) {
      import(join(process.cwd(), `${path}/${command}`)).then(
        ({ default: classCommand }) => {
          const handler = new classCommand(this, this.logger)

          this.commands.set(handler.name, handler)
        }
      )
    }
  }

  async loadEvents(path: string = 'src/events') {
    const events = readdirSync(path).filter((file) => file.endsWith('.ts'))

    for (const event of events) {
      import(join(process.cwd(), `${path}/${event}`)).then(
        ({ default: classEvent }) => {
          const handler = new classEvent(this, this.logger)

          handler.once
            ? this.once(handler.name, (...args) => handler.execute(...args))
            : this.on(handler.name, (...args) => handler.execute(...args))
          this.events.set(handler.name, handler)
        }
      )
    }
  }

  async boot() {
    super.login(process.env.BOT_TOKEN)

    await this.loadCommands()
    await this.loadEvents()

    return this
  }
}

function toApplicationCommand(collection: Collection<string, CommandHandler>) {
  return collection.map((s) => {
    return { name: s.name, description: s.description, options: s.options }
  })
}
