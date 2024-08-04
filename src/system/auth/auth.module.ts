import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'
import { jwtConstants } from './constants'

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' } // Example: token expiration time
    })
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService] // Export AuthService to be used in other modules
})
export class AuthModule {}
