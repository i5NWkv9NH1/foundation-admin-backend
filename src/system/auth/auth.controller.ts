import { Body, Get, Logger, Post } from '@nestjs/common'
import { Public, SystemController } from 'src/shared/decorators'
import { AuthService } from './auth.service'
import { LogoutDto } from './dto/logout.dto'
import { RefreshTokenDto } from './dto/refresh-token.dto'
import { SigninDto } from './dto/signin.dto'
import { SignupDto } from './dto/signup.dto'

@SystemController('auth')
export class AuthController {
  private logger = new Logger(AuthController.name)
  constructor(private readonly authService: AuthService) {}

  @Get('test')
  @Public()
  async test() {
    return 'public test'
  }

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto)
  }

  @Post('signin')
  async signin(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto)
  }

  @Post('refresh')
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto)
  }

  @Post('logout')
  async logout(@Body() logoutDto: LogoutDto) {
    const { accessToken, refreshToken } = logoutDto
    return this.authService.logout({ accessToken, refreshToken })
  }
}
