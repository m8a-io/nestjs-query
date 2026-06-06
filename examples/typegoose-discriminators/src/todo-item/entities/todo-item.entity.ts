import { modelOptions, prop, Ref } from '@typegoose/typegoose'
import { Types } from 'mongoose'

import { LocationEntity } from '../../location/entities/location.entity'
import { SubTaskEntity } from '../../sub-task/sub-task.entity'
import { TagEntity } from '../../tag/tag.entity'

@modelOptions({
  schemaOptions: {
    discriminatorKey: 'documentType',
    virtuals: true,
    toJSON: {
      virtuals: true
    }
  }
})
export class TodoItemEntity {
  id!: string

  _id!: Types.ObjectId

  @prop({ required: true })
  documentType!: string

  @prop({ required: true })
  title!: string

  @prop({ required: true, default: false })
  completed!: boolean

  @prop({
    ref: () => SubTaskEntity,
    foreignField: 'todoItem',
    localField: '_id',
    justOne: false
  })
  subTasks!: Ref<SubTaskEntity>[]

  @prop({ ref: () => TagEntity })
  tags!: Ref<TagEntity>[]

  @prop({ ref: () => LocationEntity, required: false })
  location?: Ref<LocationEntity>
}
