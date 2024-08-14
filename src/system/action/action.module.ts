import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ActionController } from './action.controller'
import { ActionService } from './action.service'
import { Action } from './entities/action.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Action])],
  controllers: [ActionController],
  providers: [ActionService],
  exports: [ActionService]
})
export class ActionModule {}
