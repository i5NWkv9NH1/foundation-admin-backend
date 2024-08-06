import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseService } from 'src/shared/providers/base.service'
import { Repository } from 'typeorm'
import { Menu } from './entities/menu.entity'

@Injectable()
export class MenusService extends BaseService<Menu> {
  constructor(
    @InjectRepository(Menu) private readonly menuRepository: Repository<Menu>
  ) {
    super(menuRepository)
  }

  protected getQueryBuilderAlias(): string {
    return 'menus'
  }
}
