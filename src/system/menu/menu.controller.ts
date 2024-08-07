import { Get, Param, Post, Query } from '@nestjs/common'
import { SystemController } from 'src/shared/decorators'
import { BaseController } from 'src/shared/providers/base.controller'
import { Menu } from './entities/menu.entity'
import { MenuService } from './menu.service'

@SystemController('menus')
export class MenuController extends BaseController<Menu> {
  constructor(private readonly menuService: MenuService) {
    super(menuService)
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('itemPerPage') itemPerPage: number = 10
  ) {
    return await this.menuService.findAll(page, itemPerPage)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.menuService.findOne(id)
  }

  @Post()
  async create(data: Menu): Promise<Menu> {
    return await this.menuService.create(data)
  }
}
