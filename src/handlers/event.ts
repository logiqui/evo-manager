import type { ConsolaInstance } from 'consola'

import { EvolutionClient } from '@/core/client'
import type { ClientEvents } from '@/core/types'
import { EmbedInteraction } from '@/handlers/embed'

export abstract class EventHandler<
  T extends keyof ClientEvents = keyof ClientEvents
> {
  public abstract readonly name: T
  public readonly once: boolean = false

  constructor(
    protected client: EvolutionClient,
    protected logger: ConsolaInstance,
    protected embeds: EmbedInteraction
  ) {}

  abstract execute(...args: ClientEvents[T]): Promise<void>
}
