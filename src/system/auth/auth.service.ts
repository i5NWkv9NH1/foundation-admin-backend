import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async createToken(userId: string, username: string): Promise<string> {
    const payload = { sub: userId, username }
    return this.jwtService.signAsync(payload)
  }

  async verifyToken(token: string): Promise<any> {
    return this.jwtService.verifyAsync(token)
  }
}
