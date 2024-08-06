import { Controller } from '@nestjs/common'
import { BaseController } from 'src/shared/providers/base.controller'
import { User } from './entities/user.entity'
import { UsersService } from './users.service'
import { SystemController } from 'src/shared/decorators'

@SystemController('users')
export class UsersController extends BaseController<User> {
  constructor(private readonly usersService: UsersService) {
    super(usersService)
  }
}
