// src/system/system.module.ts
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { AuthModule } from './auth/auth.module'
import { DepartmentModule } from './department/department.module'
import { PermissionModule } from './permission/permission.module'
import { ResourceModule } from './resource/resource.module'
import { RolesModule } from './roles/roles.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    DepartmentModule,
    PermissionModule,
    ResourceModule
    // Add other modules as needed
  ],
  exports: [
    AuthModule,
    UsersModule,
    RolesModule,
    DepartmentModule,
    PermissionModule,
    ResourceModule
    // Add other modules as needed
  ]
})
export class SystemModule {}
