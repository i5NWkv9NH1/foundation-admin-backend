import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Action } from 'rxjs/internal/scheduler/Action'
import { ActionService } from '../action/action.service'
import { Role } from './entities/role.entity'
import { RoleController } from './role.controller'
import { RoleService } from './role.service'

@Module({
  imports: [TypeOrmModule.forFeature([Role, Action])],
  controllers: [RoleController],
  providers: [RoleService, ActionService]
})
export class RoleModule {}
