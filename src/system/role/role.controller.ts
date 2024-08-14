import { SystemController } from 'src/shared/decorators'
import { BaseController } from 'src/shared/providers/base.controller'
import { Role } from './entities/role.entity'
import { RoleService } from './role.service'

@SystemController('roles')
// // @UseGuards(JwtAuthGuard, RolesGuard)
export class RoleController extends BaseController<Role> {
  constructor(private readonly roleService: RoleService) {
    super(roleService)
  }
}
