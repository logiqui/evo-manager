import type { Collection } from 'discord.js'
import { lstat, readdir } from 'fs/promises'
import path from 'path'

import type { CommandHandler } from '@/handlers/command'

export function toApplicationCommand(
  collection: Collection<string, CommandHandler>
) {
  return collection.map((s) => {
    return { name: s.name, description: s.description, options: s.options }
  })
}

export async function iterateDirectoryRecursively(
  root: string,
  rootArray?: string[]
) {
  const filesAndDirectories = await readdir(root)
  const files: string[] = []

  for (const file of filesAndDirectories) {
    const filepath = path.resolve(root, file)
    const stat = await lstat(filepath)

    if (stat.isDirectory()) {
      await iterateDirectoryRecursively(filepath, rootArray ?? files)
      continue
    }

    ;(rootArray ?? files).push(filepath)
  }

  return files
}
