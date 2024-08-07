import { Controller, Get, Query } from '@nestjs/common'
import { ActionService } from './action.service'

@Controller('actions')
export class ActionController {
  constructor(private readonly actionService: ActionService) {}

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('itemPerPage') itemPerPage: number = 10
  ) {
    return await this.actionService.findAll(page, itemPerPage)
  }
}
