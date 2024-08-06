import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Menu } from './entities/menu.entity'
import { MenusController } from './menus.controller'
import { MenusService } from './menus.service'

@Module({
  imports: [TypeOrmModule.forFeature([Menu])],
  providers: [MenusService],
  controllers: [MenusController]
})
export class MenusModule {}
