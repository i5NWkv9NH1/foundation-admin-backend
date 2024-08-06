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
import { AccountsModule } from './accounts/accounts.module'

@Module({
  imports: [
    AuthModule,
    AccountsModule,
    RolesModule,
    ActionsModule,
    MenusModule,
    OrganizationsModule,
    CDNModule
    // Add other modules as needed
  ],
  exports: [
    AuthModule,
    AccountsModule,
    RolesModule,
    ActionsModule,
    MenusModule,
    OrganizationsModule,
    CDNModule
    // Add other modules as needed
  ]
})
export class SystemModule {}
