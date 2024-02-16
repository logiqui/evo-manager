import { type ConsolaInstance, createConsola } from 'consola'
import { Client, ClientEvents, ClientOptions, Collection } from 'discord.js'
import { readdirSync } from 'fs'
import { join } from 'path'

import { CommandHandler } from '@/structures/command'
import { EventHandler } from '@/structures/event'

export class EvolutionClient extends Client {
  commands: Collection<string, CommandHandler>
  events: Collection<string, EventHandler>
  logger: ConsolaInstance

  constructor(options: ClientOptions) {
    super(options)

    this.commands = new Collection()
    this.events = new Collection()
    this.logger = createConsola({
      formatOptions: {
        columns: 80,
        date: true
      }
    })

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
          const handler: CommandHandler = new classEvent()

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
          const handler: EventHandler = new classEvent()
          const handlerName = handler.name as keyof ClientEvents

          handler.once
            ? this.once(handlerName, (...args) =>
                handler.execute(this, ...args)
              )
            : this.on(handlerName, (...args) => handler.execute(this, ...args))
          this.events.set(handler.name, handler)
        }
      )
    }
  }

  init() {
    super.login(process.env.BOT_TOKEN)
    return this
  }
}

function toApplicationCommand(collection: Collection<string, CommandHandler>) {
  return collection.map((s) => {
    return { name: s.name, description: s.description, options: s.options }
  })
}
