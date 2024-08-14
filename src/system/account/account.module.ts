import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Action } from 'rxjs/internal/scheduler/Action'
import { ActionService } from '../action/action.service'
import { Menu } from '../menu/entities/menu.entity'
import { Organization } from '../organization/entities/organization.entity'
import { Role } from '../role/entities/role.entity'
import { AccountController } from './account.controller'
import { AccountService } from './account.service'
import { Account } from './entities/account.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Account, Action, Role, Organization, Menu])
  ],
  controllers: [AccountController],
  providers: [AccountService, ActionService],
  exports: [AccountService]
})
export class AccountModule {}
