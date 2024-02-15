import { Client, ClientOptions, Collection } from 'discord.js'
import { readdirSync } from 'fs'
import { join } from 'path'

import { Command } from '@/structures/command'

export class EvolutionClient extends Client {
  commands: Collection<string, Command>
  events: Collection<string, Event>

  constructor(options: ClientOptions) {
    super(options)

    this.commands = new Collection()
    this.events = new Collection()

    this.loadCommands()
    this.loadEvents()
  }

  async registryCommands() {
    for (const [_, guild] of this.guilds.cache) {
      await guild.commands.fetch()

      // CLEAR COMMANDS
      guild.commands.cache.forEach((command) => {
        guild.commands.delete(command.id)
      })

      // SET COMMANDS
      guild.commands.set(toApplicationCommand(this.commands))
    }
  }

  loadCommands(path: string = 'src/commands') {
    const commands = readdirSync(path).filter((file) => file.endsWith('.ts'))

    for (const command of commands) {
      import(join(process.cwd(), `${path}/${command}`)).then(
        ({ default: classEvent }) => {
          const handler = new classEvent(this)

          this.commands.set(handler.name, handler)
        }
      )
    }
  }

  loadEvents(path: string = 'src/events') {
    const events = readdirSync(path).filter((file) => file.endsWith('.ts'))

    for (const event of events) {
      import(join(process.cwd(), `${path}/${event}`)).then(
        ({ default: classEvent }) => {
          const handler = new classEvent(this)

          this.events.set(handler.name, handler)
          this.on(handler.name, handler.run)
        }
      )
    }
  }

  init() {
    super.login(process.env.BOT_TOKEN)
    return this
  }
}

function toApplicationCommand(collection: Collection<string, Command>) {
  return collection.map((s) => {
    return { name: s.name, description: s.description, options: s.options }
  })
}
