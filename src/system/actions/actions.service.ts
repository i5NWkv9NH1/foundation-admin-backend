import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseService } from 'src/shared/providers/base.service'
import { Repository } from 'typeorm'
import { Action } from './entities/action.entity'

@Injectable()
export class ActionsService extends BaseService<Action> {
  constructor(
    @InjectRepository(Action)
    private readonly actionRepository: Repository<Action>
  ) {
    super(actionRepository)
  }

  // 实现抽象方法，指定查询构造器的别名
  protected getQueryBuilderAlias(): string {
    return 'action'
  }
}
