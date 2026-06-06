import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class LocationInputDTO {
  @Field()
  address!: string

  @Field()
  city!: string

  @Field()
  state!: string

  @Field()
  zipCode!: string
}
