import { InjectRedis } from '@liaoliaots/nestjs-redis'
import { Injectable } from '@nestjs/common'
import Redis from 'ioredis'
import * as svgCaptcha from 'svg-captcha'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class CaptchaService {
  constructor(
    @InjectRedis()
    private readonly redis: Redis
  ) {}

  async generateCaptcha(expire: number = 300) {
    const captcha = svgCaptcha.create()
    const captchaId = uuidv4()
    // Store captcha text in Redis with an expiration time
    await this.redis.set(captchaId, captcha.text, 'EX', expire) // 300 seconds = 5 minutes

    return {
      captchaId,
      data: captcha.data
    }
  }

  async validateCaptcha(
    captchaId: string,
    userInput: string
  ): Promise<boolean> {
    const storedCaptcha = await this.redis.get(captchaId)

    if (storedCaptcha && storedCaptcha === userInput) {
      // CAPTCHA is valid, delete it from Redis
      await this.redis.del(captchaId)
      return true
    }

    return false
  }
}
