import { Controller } from '@nestjs/common'
import { BaseController } from 'src/shared/providers/base.controller'
import { Menu } from './entities/menu.entity'
import { MenusService } from './menus.service'
import { SystemController } from 'src/shared/decorators'

@SystemController('menus')
export class MenusController extends BaseController<Menu> {
  constructor(private readonly menusService: MenusService) {
    super(menusService)
  }
}
