import { ObjectType } from '@nestjs/graphql'
import { CursorConnection, FilterableField, Relation } from '@ptc-org/nestjs-query-graphql'

import { SubTaskDTO } from '../../sub-task/dto/sub-task.dto'
import { TagDTO } from '../../tag/dto/tag.dto'
import { TodoItemDTO } from './todo-item.dto'
import { LocationDTO } from '../../location/dto/location.dto'

@ObjectType('TodoTask', { implements: () => TodoItemDTO })
@CursorConnection('subTasks', () => SubTaskDTO)
@CursorConnection('tags', () => TagDTO, { update: { enabled: true } })
@Relation('location', () => LocationDTO, {
  nullable: true
})
export class TodoTaskDTO extends TodoItemDTO {
  @FilterableField()
  priority!: number
}
