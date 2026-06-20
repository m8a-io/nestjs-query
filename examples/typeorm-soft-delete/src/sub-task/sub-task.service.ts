import { InjectRepository } from '@nestjs/typeorm'
import { QueryService } from '@m8a/nestjs-query-core'
import { TypeOrmQueryService } from '@m8a/nestjs-query-typeorm'
import { Repository } from 'typeorm'

import { SubTaskEntity } from './sub-task.entity'

@QueryService(SubTaskEntity)
export class SubTaskService extends TypeOrmQueryService<SubTaskEntity> {
  constructor(@InjectRepository(SubTaskEntity) repo: Repository<SubTaskEntity>) {
    super(repo, { useSoftDelete: true })
  }
}
