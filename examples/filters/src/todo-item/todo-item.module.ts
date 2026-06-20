import { Module } from '@nestjs/common'
import { NestjsQueryGraphQLModule } from '@m8a/nestjs-query-graphql'
import { NestjsQueryTypeOrmModule } from '@m8a/nestjs-query-typeorm'

import { TodoItemDTO } from './dto/todo-item.dto'
import { TodoItemEntity } from './todo-item.entity'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([TodoItemEntity])],
      resolvers: [
        {
          DTOClass: TodoItemDTO,
          EntityClass: TodoItemEntity
        }
      ]
    })
  ]
})
export class TodoItemModule {}
