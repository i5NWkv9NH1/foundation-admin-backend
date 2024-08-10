import { Get, Param } from '@nestjs/common'
import { SystemController } from 'src/shared/decorators'
import { BaseController } from 'src/shared/providers/base.controller'
import { AccountService } from './account.service'
import { Account } from './entities/account.entity'

@SystemController('accounts')
// @UseGuards(JwtAuthGuard, RolesGuard)
export class AccountController extends BaseController<Account> {
  constructor(private readonly accountService: AccountService) {
    super(accountService)
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<Account> {
    return await this.service.findOne(id)
  }
}
