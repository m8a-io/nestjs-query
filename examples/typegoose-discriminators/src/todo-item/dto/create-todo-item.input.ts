import { Field, ID, InputType } from '@nestjs/graphql'

@InputType()
export class CreateTodoItemInput {
  @Field()
  title!: string

  @Field()
  completed!: boolean

  @Field(() => ID, { nullable: true })
  location?: string
}
