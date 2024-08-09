import { Body, Get, Post } from '@nestjs/common'
import { Public, SystemController } from 'src/shared/decorators'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'

@SystemController('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('test')
  @Public()
  async test() {
    return 'public test'
  }

  @Post('signup')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto)
  }

  @Post('signin')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto)
  }
}
