import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { SystemResponseInterceptor } from 'src/shared/interceptors/system-response.interceptor'
import { AccountModule } from './account/account.module'
import { ActionModule } from './action/action.module'
import { MenuModule } from './menu/menu.module'
import { OrganizationModule } from './organization/organization.module'
import { RoleModule } from './role/role.module'

@Module({
  imports: [
    AccountModule,
    ActionModule,
    MenuModule,
    RoleModule,
    OrganizationModule
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: SystemResponseInterceptor
    }
  ]
})
export class SystemModule {}
