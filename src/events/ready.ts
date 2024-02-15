import { EvolutionClient } from '@/client'
import { Event } from '@/structures/events'

export default class ReadyEvent extends Event {
  constructor(client: EvolutionClient) {
    super(client, {
      name: 'ready'
    })
  }

  async run(client: EvolutionClient, ..._args: any[]) {
    await client.registryCommands()
  }
}
