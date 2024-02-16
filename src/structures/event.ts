import type { ConsolaInstance } from 'consola'

import { EvolutionClient } from '@/client'
import { ClientEvents } from '@/types'

export abstract class EventHandler<
  T extends keyof ClientEvents = keyof ClientEvents
> {
  public abstract readonly name: T
  public readonly once: boolean = false

  constructor(
    protected client: EvolutionClient,
    protected logger: ConsolaInstance
  ) {}

  async execute(...args: ClientEvents[T]) {}
}
