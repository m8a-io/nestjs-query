import { ObjectType } from '@nestjs/graphql'
import { FilterableField } from '@ptc-org/nestjs-query-graphql'
import { ID } from '@nestjs/graphql'

@ObjectType('Location')
export class LocationDTO {
  @FilterableField(() => ID)
  id!: string

  @FilterableField()
  address!: string

  @FilterableField()
  city!: string

  @FilterableField()
  state!: string

  @FilterableField()
  zipCode!: string
}
