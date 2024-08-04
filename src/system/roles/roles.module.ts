import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Permission } from '../permission/entities/permission.entity'
import { User } from '../users/entities/user.entity'
import { Role } from './entities/role.entity'
import { RolesResolver } from './roles.resolver'
import { RolesService } from './roles.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, Permission, User]) // Register Role, Permission, and User entities
  ],
  providers: [RolesResolver, RolesService]
})
export class RolesModule {}
