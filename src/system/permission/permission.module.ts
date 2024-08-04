import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Role } from '../roles/entities/role.entity'
import { Permission } from './entities/permission.entity'
import { PermissionResolver } from './permission.resolver'
import { PermissionService } from './permission.service'

@Module({
  imports: [TypeOrmModule.forFeature([Permission, Role])],
  providers: [PermissionResolver, PermissionService]
})
export class PermissionModule {}
