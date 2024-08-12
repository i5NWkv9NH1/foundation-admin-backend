import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { JwtPayload } from 'src/shared/interfaces/jwt-payload.interface'
import { AccountService } from 'src/system/account/account.service'
import { BlacklistedTokensService } from './blacklisted-token.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    protected configService: ConfigService,
    private accountService: AccountService,
    private readonly blacklistedTokensService: BlacklistedTokensService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET')
    })
  }

  // async validate(payload: JwtPayload) {
  //   const account = await this.accountService.findOne(payload.sub)
  //   return account
  // }
  async validate(payload: JwtPayload) {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(payload)

    if (await this.blacklistedTokensService.isTokenBlacklisted(token)) {
      throw new UnauthorizedException('Token has been blacklisted')
    }

    // 使用 payload.sub 查询用户信息
    // ! 根据 payload 的内容决定查询哪个表
    // let account
    // if (payload.type === 'admin') {
    //   // 假设 payload 中有 type 字段来区分
    //   account = await this.accountService.findOne(payload.sub)
    // } else {
    //   account = await this.userService.findOne(payload.sub)
    // }

    const account = await this.accountService.findOne(payload.sub)

    if (!account) {
      throw new UnauthorizedException('Account not found')
    }

    return account
  }
}
