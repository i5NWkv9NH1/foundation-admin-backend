import { Get, Param, Query } from '@nestjs/common'
import { SystemController } from 'src/shared/decorators'
import { AccountService } from './account.service'

@SystemController('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('itemPerPage') itemPerPage: number = 10
  ) {
    return await this.accountService.findAll(page, itemPerPage)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.accountService.findOne(id)
  }
}
