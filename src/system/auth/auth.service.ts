import {
  BadRequestException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { compare, hash } from 'bcrypt'
import { CaptchaService } from 'src/modules/captcha/captcha.service'
import { AccountService } from 'src/system/account/account.service'
import { Account } from 'src/system/account/entities/account.entity'
import { Repository } from 'typeorm'
import { BlacklistedTokensService } from './blacklisted-token.service'
import { LoginDto } from './dto/login.dto'
import { RefreshTokenDto } from './dto/refresh-token.dto'
import { RegisterDto } from './dto/register.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly accountService: AccountService,
    private readonly blacklistedTokensService: BlacklistedTokensService,
    private readonly captchaService: CaptchaService,

    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>
  ) {}

  async register(registerDto: RegisterDto): Promise<{
    accessToken: string
    refreshToken: string
    account: Account
  }> {
    const { username, password, uniqueId, captcha, ...rest } = registerDto
    const hashedPassword = await hash(password, 10)

    const account = this.accountRepository.create({
      ...rest,
      username,
      password: hashedPassword,
      originPassword: password
    })

    const isSaved = await this.accountRepository.save(account)
    if (isSaved) {
      return await this.login({
        uniqueId,
        captcha,
        username,
        password
      })
    }
  }

  async login(loginDto: LoginDto): Promise<{
    accessToken: string
    refreshToken: string
    account: Account
  }> {
    const { username, password } = loginDto
    const isCaptchaValid = this.captchaService.validateCaptcha(
      loginDto.uniqueId,
      loginDto.captcha
    )
    if (!isCaptchaValid) {
      throw new BadRequestException('Captcha code error')
    }

    const account = await this.accountService.findByUsername(username)

    if (!account || !(await compare(password, account.password))) {
      throw new BadRequestException('Username or Password incorrect')
    }

    const payload = { account, sub: account.id }
    const accessToken = this.generateToken(payload, '1h')
    const refreshToken = this.generateToken(payload, '7d')

    return {
      accessToken,
      refreshToken,
      account
    }
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    const { refreshToken } = refreshTokenDto

    try {
      const payload = this.jwtService.verify(refreshToken)

      if (
        await this.blacklistedTokensService.isTokenBlacklisted(refreshToken)
      ) {
        throw new UnauthorizedException('Refresh token is blacklisted')
      }

      const newAccessToken = this.generateToken(
        { sub: payload.sub, account: payload.account },
        '1h'
      )
      const newRefreshToken = this.generateToken(
        { sub: payload.sub, account: payload.account },
        '7d'
      )

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        account: payload.account
      }
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token')
    }
  }

  private generateToken(payload: any, expiresIn: string): string {
    return this.jwtService.sign(payload, { expiresIn })
  }
}
