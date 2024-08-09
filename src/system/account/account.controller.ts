import { SystemController } from 'src/shared/decorators'
import { BaseController } from 'src/shared/providers/base.controller'
import { AccountService } from './account.service'
import { Account } from './entities/account.entity'

@SystemController('accounts')
export class AccountController extends BaseController<Account> {
  constructor(private readonly accountService: AccountService) {
    super(accountService)
  }
}
