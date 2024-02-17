import type { ConsolaInstance } from 'consola'

import { EvolutionClient } from '@/core/client'
import { ClientEvents } from '@/core/types'

export abstract class EventHandler<
  T extends keyof ClientEvents = keyof ClientEvents
> {
  public abstract readonly name: T
  public readonly once: boolean = false

  constructor(
    protected client: EvolutionClient,
    protected logger: ConsolaInstance
  ) {}

  abstract execute(...args: ClientEvents[T]): Promise<void>
}
