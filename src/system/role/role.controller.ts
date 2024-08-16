import {
  Body,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Query
} from '@nestjs/common'
import { SystemController } from 'src/shared/decorators'
import { BaseController } from 'src/shared/providers/base.controller'
import { Action } from '../action/entities/action.entity'
import { Role } from './entities/role.entity'
import { RoleService } from './role.service'

@SystemController('roles')
// // @UseGuards(JwtAuthGuard, RolesGuard)
export class RoleController extends BaseController<Role> {
  constructor(private readonly roleService: RoleService) {
    super(roleService)
  }

  @Get(':roleId/menus/:menuId')
  async findActionsByRoleIdMenuId(
    @Param('roleId') roleId: string,
    @Param('menuId') menuId: string,
    @Query('page', new DefaultValuePipe('1'), ParseIntPipe) page: number = 1,
    @Query('itemsPerPage', new DefaultValuePipe('-1'), ParseIntPipe)
    itemsPerPage: number
  ) {
    return await this.roleService.findRoleActionsByMenuIdAndRoleId(
      roleId,
      menuId,
      page,
      itemsPerPage
    )
  }

  @Put(':roleId/menus/:menuId')
  async updateRoleActionsByRoleIdMenuId(
    @Param('roleId') roleId: string,
    @Param('menuId') menuId: string,
    @Body() data: { actions: Action[] }
  ) {
    const { actions } = data
    return await this.roleService.updateRoleActionsByRoleIdMenuId(
      roleId,
      menuId,
      actions
    )
  }
}
