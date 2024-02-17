import { IntentsBitField } from 'discord.js'

import { EvolutionClient } from '@/core/client'

;(async () => {
  const client = new EvolutionClient({
    intents: [
      IntentsBitField.Flags.Guilds,
      IntentsBitField.Flags.GuildMembers,
      IntentsBitField.Flags.GuildMessages
    ]
  })

  await client.boot()
})()
