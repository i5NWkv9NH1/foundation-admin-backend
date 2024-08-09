import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Action } from 'rxjs/internal/scheduler/Action'
import { ActionService } from '../action/action.service'
import { AccountController } from './account.controller'
import { AccountService } from './account.service'
import { Account } from './entities/account.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Account, Action])],
  controllers: [AccountController],
  providers: [AccountService, ActionService],
  exports: [AccountService, ActionService]
})
export class AccountModule {}
