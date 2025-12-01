import { ID, ObjectType } from '@nestjs/graphql'
import { FilterableField } from '@m8a/nestjs-query-graphql'

@ObjectType()
export class TestRelationDTO {
  @FilterableField(() => ID)
  id!: string

  @FilterableField()
  testResolverId!: string
}
