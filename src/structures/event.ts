import { ClientEvents } from 'discord.js'

import { EvolutionClient } from '@/client'

export type EventType = keyof ClientEvents

export type EventOptions = {
  name: EventType
  once?: boolean
}

export class EventHandler {
  name: string
  once?: boolean

  constructor(options: EventOptions) {
    this.name = options.name
    this.once = options.once
  }

  public async execute(client: EvolutionClient, ...args: any[]) {}
}
