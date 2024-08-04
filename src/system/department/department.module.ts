import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../users/entities/user.entity'
import { DepartmentResolver } from './department.resolver'
import { DepartmentService } from './department.service'
import { Department } from './entities/department.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User, Department])],
  providers: [DepartmentService, DepartmentResolver],
  exports: [DepartmentService]
})
export class DepartmentModule {}
