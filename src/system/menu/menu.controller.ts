import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { SystemController } from 'src/shared/decorators'
import { BaseController } from 'src/shared/providers/base.controller'
import { Menu } from './entities/menu.entity'
import { MenuService } from './menu.service'

@SystemController('menus')
// @UseGuards(JwtAuthGuard, RolesGuard)
export class MenuController extends BaseController<Menu> {
  constructor(private readonly menuService: MenuService) {
    super(menuService)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.menuService.findOne(id)
  }

  @Post()
  async create(@Body() data: Menu): Promise<Menu> {
    return await this.menuService.create(data)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Menu) {
    return await this.menuService.update(id, data)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.menuService.delete(id)
  }
}
