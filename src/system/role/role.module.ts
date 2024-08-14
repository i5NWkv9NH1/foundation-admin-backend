import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Action } from 'rxjs/internal/scheduler/Action'
import { ActionService } from '../action/action.service'
import { Menu } from '../menu/entities/menu.entity'
import { Role } from './entities/role.entity'
import { RoleController } from './role.controller'
import { RoleService } from './role.service'

@Module({
  imports: [TypeOrmModule.forFeature([Role, Action, Menu])],
  controllers: [RoleController],
  providers: [RoleService, ActionService],
  exports: [RoleService]
})
export class RoleModule {}
