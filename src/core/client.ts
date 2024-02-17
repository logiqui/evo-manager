import { createConsola } from 'consola'
import { Client, ClientOptions, Collection } from 'discord.js'
import path from 'path'

import { CommandHandler } from '@/handlers/command'
import { EventHandler } from '@/handlers/event'

import { iterateDirectoryRecursively, toApplicationCommand } from './utils'

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

  async loadCommands(filePath = path.resolve(__dirname, '../commands')) {
    const commandFiles = await iterateDirectoryRecursively(filePath)

    for (const file of commandFiles) {
      if (!file.endsWith('.ts')) {
        continue
      }

      const { default: ClassCommand } = await import(file)
      const handler = new ClassCommand(this, this.logger)

      this.commands.set(handler.name, handler)
    }
  }

  async loadEvents(filePath = path.resolve(__dirname, '../events')) {
    const eventFiles = await iterateDirectoryRecursively(filePath)

    for (const file of eventFiles) {
      if (!file.endsWith('.ts')) {
        continue
      }

      const { default: EventClass } = await import(file)
      const handler = new EventClass(this, this.logger)

      handler.once
        ? this.once(handler.name, (...args) => handler.execute(...args))
        : this.on(handler.name, (...args) => handler.execute(...args))

      this.events.set(handler.name, handler)
    }
  }

  async boot() {
    super.login(process.env.BOT_TOKEN)

    await this.loadCommands()
    await this.loadEvents()

    return this
  }
}
