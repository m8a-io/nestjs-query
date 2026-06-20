import { Module } from '@nestjs/common'
import { NestjsQueryGraphQLModule } from '@m8a/nestjs-query-graphql'
import { NestjsQueryTypeOrmModule } from '@m8a/nestjs-query-typeorm'

import { AuthGuard } from '../auth/auth.guard'
import { AuthModule } from '../auth/auth.module'
import { TodoItemDTO } from './dto/todo-item.dto'
import { TodoItemInputDTO } from './dto/todo-item-input.dto'
import { TodoItemUpdateDTO } from './dto/todo-item-update.dto'
import { TodoItemEntity } from './todo-item.entity'
import { TodoItemResolver } from './todo-item.resolver'

const guards = [AuthGuard]

@Module({
  providers: [TodoItemResolver],
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([TodoItemEntity]), AuthModule],
      resolvers: [
        {
          DTOClass: TodoItemDTO,
          EntityClass: TodoItemEntity,
          CreateDTOClass: TodoItemInputDTO,
          UpdateDTOClass: TodoItemUpdateDTO,
          create: { guards },
          update: { guards },
          delete: { guards }
        }
      ]
    })
  ]
})
export class TodoItemModule {}
