import { Body, Get, Param, Post, Query } from '@nestjs/common'
import { SystemController } from 'src/shared/decorators'
import { BaseController } from 'src/shared/providers/base.controller'
import { CreateRoleDto } from './dto/create-role.dto'
import { Role } from './entities/role.entity'
import { RoleService } from './role.service'

@SystemController('roles')
export class RoleController extends BaseController<Role> {
  constructor(private readonly roleService: RoleService) {
    super(roleService)
  }
  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('itemPerPage') itemPerPage: number = 10
  ) {
    return await this.roleService.findAll(page, itemPerPage)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.roleService.findOne(id)
  }

  @Post()
  async create(@Body() role: CreateRoleDto) {
    return this.roleService.create(role)
  }
}
