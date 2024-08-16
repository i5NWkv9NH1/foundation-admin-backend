import {
  Body,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common'
import { Actions, SystemController } from 'src/shared/decorators'
import { BaseController } from 'src/shared/providers/base.controller'
import { DeepPartial } from 'typeorm'
import { Action } from '../action/entities/action.entity'
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

  @Get()
  @Actions('view:sys:menus')
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('itemsPerPage', new DefaultValuePipe(-1), ParseIntPipe)
    itemsPerPage: number,
    @Query('filters', new DefaultValuePipe('{}')) filters: string
  ) {
    return await this.roleService.findAll(
      page,
      itemsPerPage,
      JSON.parse(filters)
    )
  }

  @Get(':id')
  @Actions('view:sys:menus')
  async findOne(id: string): Promise<Role> {
    return await super.findOne(id)
  }

  @Post()
  @Actions('create:sys:menus')
  async create(entity: Role): Promise<Role> {
    return await super.create(entity)
  }

  @Put(':id')
  @Actions('update:sys:menus')
  async update(id: string, entity: DeepPartial<Role>): Promise<Role> {
    return await super.update(id, entity)
  }

  @Delete(':id')
  @Actions('delete:sys:menus')
  async delete(id: string): Promise<void> {
    return await super.delete(id)
  }

  @Get(':roleId/menus/:menuId')
  @Actions('view:sys:menus')
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
  @Actions('update:sys:menus')
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
