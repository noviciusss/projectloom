import { type SchemaTypeDefinition } from 'sanity'
import { author } from './author'
import { startup } from './strartup'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author,startup],
}
