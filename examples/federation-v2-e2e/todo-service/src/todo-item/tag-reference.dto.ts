import { Directive, ID, ObjectType } from '@nestjs/graphql'
import { FilterableField } from '@m8a/nestjs-query-graphql'

/**
 * Reference DTO for Tag entity (UUID ID type)
 * This is used to resolve Tag references in Federation
 */
@ObjectType('Tag')
@Directive('@key(fields: "id")')
export class TagReferenceDTO {
  @FilterableField(() => ID)
  id!: string
}
