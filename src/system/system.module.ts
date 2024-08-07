import { Module } from '@nestjs/common'
import { AccountModule } from './account/account.module'
import { RoleModule } from './role/role.module'
import { OrganizationModule } from './organization/organization.module'
import { ActionModule } from './action/action.module'
import { MenuModule } from './menu/menu.module'

@Module({
  imports: [
    AccountModule,
    ActionModule,
    MenuModule,
    RoleModule,
    OrganizationModule
  ]
})
export class SystemModule {}
