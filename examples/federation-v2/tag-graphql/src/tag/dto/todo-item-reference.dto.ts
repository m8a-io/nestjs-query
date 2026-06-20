import { Directive, Field, ID, ObjectType } from '@nestjs/graphql'
import { CursorConnection } from '@m8a/nestjs-query-graphql'

import { TagTodoItemDTO } from './tag-todo-item.dto'

@ObjectType('TodoItem')
@Directive('@key(fields: "id")')
@CursorConnection('tagTodoItems', () => TagTodoItemDTO)
export class TodoItemReferenceDTO {
  @Field(() => ID)
  id!: number
}
