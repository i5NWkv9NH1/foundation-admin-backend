import { Controller } from '@nestjs/common'
import { BaseController } from 'src/shared/providers/base.controller'
import { Role } from './entities/role.entity'
import { RolesService } from './roles.service'
import { SystemController } from 'src/shared/decorators'

@SystemController('roles')
export class RolesController extends BaseController<Role> {
  constructor(private readonly rolesService: RolesService) {
    super(rolesService)
  }
}
