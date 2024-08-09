import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { SystemHttpExceptionFilter } from 'src/shared/filters/system-http-exception.filter'
import { SystemResponseInterceptor } from 'src/shared/interceptors/system-response.interceptor'
import { AccountModule } from './account/account.module'
import { ActionModule } from './action/action.module'
import { AuthModule } from './auth/auth.module'
import { JwtAuthGuard } from './auth/jwt-auth.guard'
import { RolesGuard } from './auth/roles.guard'
import { MenuModule } from './menu/menu.module'
import { OrganizationModule } from './organization/organization.module'
import { RoleModule } from './role/role.module'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') }
      }),
      inject: [ConfigService]
    }),
    AuthModule,
    AccountModule,
    ActionModule,
    MenuModule,
    RoleModule,
    OrganizationModule
  ],
  providers: [
    {
      provide: APP_FILTER,
      // TODO: add multiple error
      useClass: SystemHttpExceptionFilter
    },
    // Register the dependency
    {
      provide: APP_INTERCEPTOR,
      useClass: SystemResponseInterceptor
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ]
})
export class SystemModule {}
