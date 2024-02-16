import { ClientEvents } from 'discord.js'

import { EvolutionClient } from '@/client'
import { EventHandler } from '@/structures/event'

export default class InteractionCreateEvent extends EventHandler {
  constructor() {
    super({
      name: 'interactionCreate',
      once: false
    })
  }

  public async execute(
    client: EvolutionClient,
    interaction: ClientEvents['interactionCreate']
  ) {
    console.log(interaction)
  }
}
