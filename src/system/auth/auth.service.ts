import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { compare, hash } from 'bcrypt'
import { AccountService } from 'src/system/account/account.service'
import { Account } from 'src/system/account/entities/account.entity'
import { Repository } from 'typeorm'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly accountService: AccountService,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>
  ) {}

  async register(registerDto: RegisterDto): Promise<Account> {
    const { username, password, ...rest } = registerDto
    const hashedPassword = await hash(password, 10)

    const account = this.accountRepository.create({
      ...rest,
      username,
      password: hashedPassword
    })

    return this.accountRepository.save(account)
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { username, password } = loginDto
    const account = await this.accountService.findByUsername(username)

    if (!account || !(await compare(password, account.password))) {
      throw new BadRequestException('Invalid credentials')
    }

    const payload = { username: account.username, sub: account.id }
    const accessToken = this.jwtService.sign(payload)

    return { accessToken }
  }
}
