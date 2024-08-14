import { Body, Logger, Param, Put } from '@nestjs/common'
import { Actions, SystemController } from 'src/shared/decorators'
import { BaseController } from 'src/shared/providers/base.controller'
import { AccountService } from './account.service'
import { UpdateAccountDto } from './dto/update-account.dto'
import { Account } from './entities/account.entity'

@SystemController('accounts')
export class AccountController extends BaseController<Account> {
  protected logger = new Logger(AccountController.name)

  constructor(private readonly accountService: AccountService) {
    super(accountService)
  }

  @Put(':id')
  @Actions('UPDATE')
  async updateAccount(
    @Param('id') id: string,
    @Body() updateAccountDto: UpdateAccountDto
  ) {
    return await this.accountService.updateAccount(id, updateAccountDto)
  }
}
