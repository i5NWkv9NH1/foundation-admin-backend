import { Get, Param, Query } from '@nestjs/common'
import { SystemController } from 'src/shared/decorators'
import { BaseController } from 'src/shared/providers/base.controller'
import { AccountService } from './account.service'
import { Account } from './entities/account.entity'

@SystemController('accounts')
export class AccountController extends BaseController<Account> {
  constructor(private readonly accountService: AccountService) {
    super(accountService)
  }

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
