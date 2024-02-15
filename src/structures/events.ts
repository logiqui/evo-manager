import { Client, ClientEvents } from 'discord.js'

import { EvolutionClient } from '@/client'

type EventOptions = {
  name: keyof ClientEvents
}

export class Event {
  client: EvolutionClient
  name: string

  constructor(client: EvolutionClient, options: EventOptions) {
    this.client = client
    this.name = options.name
  }
}
