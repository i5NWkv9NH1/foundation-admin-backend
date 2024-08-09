import { UseGuards } from '@nestjs/common'
import { SystemController } from 'src/shared/decorators'
import { BaseController } from 'src/shared/providers/base.controller'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { RolesGuard } from '../auth/roles.guard'
import { Role } from './entities/role.entity'
import { RoleService } from './role.service'

@SystemController('roles')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RoleController extends BaseController<Role> {
  constructor(private readonly roleService: RoleService) {
    super(roleService)
  }
}
