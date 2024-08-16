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
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { RolesGuard } from '../auth/roles.guard'
import { Menu } from './entities/menu.entity'
import { MenuService } from './menu.service'

@SystemController('menus')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MenuController extends BaseController<Menu> {
  constructor(private readonly menuService: MenuService) {
    super(menuService)
  }

  @Get()
  @Actions('view:sys:menus')
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('itemsPerPage', new DefaultValuePipe(-1), ParseIntPipe)
    itemsPerPage: number,
    @Query('filters', new DefaultValuePipe('{}')) filters: string
  ) {
    return await this.menuService.findAll(
      page,
      itemsPerPage,
      JSON.parse(filters)
    )
  }

  @Get(':id')
  @Actions('view:sys:menus')
  async findOne(@Param('id') id: string) {
    return await this.menuService.findOne(id)
  }

  @Post()
  @Actions('create:sys:menus')
  async create(@Body() data: Menu): Promise<Menu> {
    return await this.menuService.create(data)
  }

  @Put(':id')
  @Actions('update:sys:menus')
  async update(@Param('id') id: string, @Body() data: Menu) {
    return await this.menuService.update(id, data)
  }

  @Delete(':id')
  @Actions('delete:sys:menus')
  async delete(@Param('id') id: string) {
    return await this.menuService.delete(id)
  }
}
