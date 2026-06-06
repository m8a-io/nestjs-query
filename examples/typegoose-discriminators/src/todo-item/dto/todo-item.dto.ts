import { ID, InterfaceType } from '@nestjs/graphql'
import { FilterableField, IDField, Relation } from '@ptc-org/nestjs-query-graphql'

import { LocationDTO } from '../../location/dto/location.dto'

@InterfaceType({
  resolveType: async (obj: { documentType: string }) => {
    if (obj.documentType === 'TodoTaskEntity') {
      return import('./todo-task.dto').then((m) => m.TodoTaskDTO)
    }
    if (obj.documentType === 'TodoAppointmentEntity') {
      return import('./todo-appointment.dto').then((m) => m.TodoAppointmentDTO)
    }
    return undefined
  }
})
export abstract class TodoItemDTO {
  @IDField(() => ID)
  id!: string

  @FilterableField()
  title!: string

  @FilterableField()
  completed!: boolean

  @FilterableField()
  documentType!: string
}
