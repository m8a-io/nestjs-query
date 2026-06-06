import { GraphQLISODateTime, ObjectType } from '@nestjs/graphql'
import { CursorConnection, FilterableField, Relation } from '@ptc-org/nestjs-query-graphql'

import { SubTaskDTO } from '../../sub-task/dto/sub-task.dto'
import { TagDTO } from '../../tag/dto/tag.dto'
import { TodoItemDTO } from './todo-item.dto'
import { LocationDTO } from '../../location/dto/location.dto'

@ObjectType('TodoAppointment', { implements: () => TodoItemDTO })
@CursorConnection('subTasks', () => SubTaskDTO)
@CursorConnection('tags', () => TagDTO, { update: { enabled: true } })
@Relation('location', () => LocationDTO, {
  nullable: true
})  
export class TodoAppointmentDTO extends TodoItemDTO {
  @FilterableField(() => GraphQLISODateTime)
  dateTime!: Date

  @FilterableField(() => [String])
  participants!: string[]
}
