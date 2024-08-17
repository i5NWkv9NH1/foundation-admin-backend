import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { compare, hash } from 'bcrypt'
import { chain, uniq } from 'lodash'
import { DEFAULT_ROLE_NAME } from 'src/constants'
import { CaptchaService } from 'src/modules/captcha/captcha.service'
import { AccountService } from 'src/system/account/account.service'
import { Account } from 'src/system/account/entities/account.entity'
import { In, Repository } from 'typeorm'
import { Action } from '../action/entities/action.entity'
import { Menu } from '../menu/entities/menu.entity'
import {
  Organization,
  TypeEnum
} from '../organization/entities/organization.entity'
import { Role } from '../role/entities/role.entity'
import { BlacklistedTokensService } from './blacklisted-token.service'
import { LogoutDto } from './dto/logout.dto'
import { RefreshTokenDto } from './dto/refresh-token.dto'
import { SigninDto } from './dto/signin.dto'
import { SignupDto } from './dto/signup.dto'

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name)

  constructor(
    private readonly jwtService: JwtService,
    private readonly accountService: AccountService,
    private readonly blacklistedTokensService: BlacklistedTokensService,
    private readonly captchaService: CaptchaService,

    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(Action)
    private readonly actionRepo: Repository<Action>,
    @InjectRepository(Menu)
    private readonly menuRepo: Repository<Menu>,
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
    @InjectRepository(Organization)
    private readonly organizationRepo: Repository<Organization>
  ) {}

  async signup(signupDto: SignupDto): Promise<{
    token: {
      accessToken: string
      refreshToken: string
    }
    account: Account
    permissions: { actions: Action[]; menus: Menu[] }
  }> {
    const { username, password, uniqueId, captcha, ...rest } = signupDto

    const hashedPassword = await hash(password, 10)

    let roles = rest.roles || []
    let organizations = rest.organizations || []

    if (roles.length === 0) {
      const userRole = await this.roleRepo.findOne({
        where: { name: DEFAULT_ROLE_NAME }
      })
      if (userRole) {
        roles = [userRole]
      }
    }

    if (organizations.length === 0) {
      const company = await this.organizationRepo.findOne({
        where: { type: TypeEnum.COMPANY }
      })
      if (company) {
        organizations = [company]
      }
    }

    const account = this.accountRepository.create({
      ...rest,
      username,
      password: hashedPassword,
      originPassword: password,
      roles,
      organizations
    })

    try {
      const savedAccount = await this.accountRepository.save(account)
      if (!savedAccount) {
        throw new BadRequestException('Account could not be saved')
      }
      return await this.signin({ uniqueId, captcha, username, password })
    } catch (error) {
      throw new BadRequestException(`Signup failed: ${error.message}`)
    }
  }

  async signin(signinDto: SigninDto): Promise<{
    token: {
      accessToken: string
      refreshToken: string
    }
    account: Account
    permissions: { actions: Action[]; menus: Menu[] }
  }> {
    const { username, password } = signinDto
    const isCaptchaValid = await this.captchaService.validateCaptcha(
      signinDto.uniqueId,
      signinDto.captcha
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
    const permissions = await this.findPermissions(account)

    return {
      token: {
        accessToken,
        refreshToken
      },
      account,
      permissions
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
      const permissions = await this.findPermissions(payload.account)

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        account: payload.account,
        permissions
      }
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token')
    }
  }

  private generateToken(payload: any, expiresIn: string): string {
    return this.jwtService.sign(payload, { expiresIn })
  }

  // typeorm
  public async findPermissions(account: Account): //
  Promise<{
    actions: Action[]
    menus: Menu[]
  }> {
    // 获取用户的角色ID数组
    const roleIds = account.roles.map((role) => role.id)

    // 查找所有属于这些角色的actions
    const actions = await this.actionRepo.find({
      where: {
        roles: { id: In(roleIds) }
      }
    })
    // 提取唯一的 menuIds
    const menuIds = uniq(actions.map((action) => action.menuId))
    // 获取所有相关的路径
    const paths = await this.menuRepo.find({
      where: {
        id: In(menuIds)
      },
      select: ['path']
    })

    // 获取所有子菜单的ID
    const allMenuIds = chain(paths)
      .flatMap((path) => path.path.split('.'))
      .uniq()
      .value()
    // 查找所有菜单项
    const menus = await this.menuRepo.find({
      where: {
        id: In(allMenuIds)
      },
      relations: ['parent', 'children']
    })
    return { actions, menus }
  }

  async logout({ accessToken, refreshToken }: LogoutDto) {
    // 处理 access token
    await this.blacklistToken(accessToken)

    // 处理 refresh token
    await this.blacklistToken(refreshToken)
  }

  private async blacklistToken(token: string): Promise<void> {
    const decodedToken = this.jwtService.decode(token) as any
    if (decodedToken && decodedToken.exp) {
      const expiry = decodedToken.exp - Math.floor(Date.now() / 1000)
      await this.blacklistedTokensService.addTokenToBlacklist(token, expiry)
    }
  }
}
