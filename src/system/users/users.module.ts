import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Department } from '../department/entities/department.entity'
import { Role } from '../roles/entities/role.entity'
import { User } from './entities/user.entity'
import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Department])],
  providers: [UsersResolver, UsersService]
})
export class UsersModule {}
