import { ObjectType } from '@nestjs/graphql'
import { FilterableField, PagingStrategies, QueryOptions } from '@m8a/nestjs-query-graphql'

@ObjectType('TodoItemOffsetFetchWithNegativeDisable')
@QueryOptions({ enableTotalCount: true, pagingStrategy: PagingStrategies.OFFSET })
export class TodoItemOffsetFetchWithNegativeDisableDTO {
  @FilterableField()
  id!: number

  @FilterableField()
  title!: string

  @FilterableField()
  completed: boolean
}
