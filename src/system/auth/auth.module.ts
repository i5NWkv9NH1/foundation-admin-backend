import { Global, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CoreModule } from 'src/core/core.module'
import { CaptchaModule } from 'src/shared/captcha/captcha.module'
import { AccountService } from '../account/account.service'
import { Account } from '../account/entities/account.entity'
import { Action } from '../action/entities/action.entity'
import { Menu } from '../menu/entities/menu.entity'
import { Organization } from '../organization/entities/organization.entity'
import { Role } from '../role/entities/role.entity'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { BlacklistedTokensService } from './blacklisted-token.service'
import { JwtAuthGuard } from './jwt-auth.guard'
import { JwtStrategy } from './jwt.strategy'
import { RolesGuard } from './roles.guard'

@Global()
@Module({
  imports: [
    CoreModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') }
      }),
      inject: [ConfigService]
    }),
    TypeOrmModule.forFeature([Account, Action, Menu, Role, Organization]),
    CaptchaModule
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    JwtAuthGuard,
    RolesGuard,
    AuthService,
    AccountService,
    BlacklistedTokensService
  ],
  exports: [
    JwtStrategy,
    JwtAuthGuard,
    RolesGuard,
    AuthService,
    JwtModule,
    AccountService
  ]
})
export class AuthModule {}
