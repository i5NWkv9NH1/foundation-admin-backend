import { Get, Query } from '@nestjs/common'
import { SystemController } from 'src/shared/decorators'
import { BaseController } from 'src/shared/providers/base.controller'
import { ActionService } from './action.service'
import { Action } from './entities/action.entity'

@SystemController('actions')
export class ActionController extends BaseController<Action> {
  constructor(private readonly actionService: ActionService) {
    super(actionService)
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('itemPerPage') itemPerPage: number = 10
  ) {
    return await this.actionService.findAll(page, itemPerPage)
  }
}
