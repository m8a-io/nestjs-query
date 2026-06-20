import { ObjectType } from '@nestjs/graphql'
import { FilterableField, QueryOptions } from '@m8a/nestjs-query-graphql'

@ObjectType('TodoItemCursorFetchWithNegativeEnable')
@QueryOptions({ enableTotalCount: true, enableFetchAllWithNegative: true })
export class TodoItemCursorFetchWithNegativeEnableDTO {
  @FilterableField()
  id!: number

  @FilterableField()
  title!: string

  @FilterableField()
  completed: boolean
}
