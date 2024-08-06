// src/system/system.module.ts
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { ActionsModule } from './actions/actions.module'
import { AuthModule } from './auth/auth.module'
import { CDNModule } from './cdn/cdn.module'
import { MenusModule } from './menus/menus.module'
import { OrganizationsModule } from './organizations/organizations.module'
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
    ActionsModule,
    MenusModule,
    OrganizationsModule,
    CDNModule
    // Add other modules as needed
  ],
  exports: [
    AuthModule,
    UsersModule,
    RolesModule,
    ActionsModule,
    MenusModule,
    OrganizationsModule,
    CDNModule
    // Add other modules as needed
  ]
})
export class SystemModule {}
