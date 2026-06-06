import { prop } from '@typegoose/typegoose'
import { Types } from 'mongoose'

export class LocationEntity {
  id!: string

  _id!: Types.ObjectId

  @prop({ required: true })
  address!: string

  @prop({ required: true })
  city!: string

  @prop({ required: true })
  state!: string

  @prop({ required: true })
  zipCode!: string
}
