import { InjectRedis } from '@liaoliaots/nestjs-redis'
import { Injectable } from '@nestjs/common'
import Redis from 'ioredis'
import * as svgCaptcha from 'svg-captcha'

@Injectable()
export class CaptchaService {
  private readonly captchaExpire = 5 * 60 // 5 minutes expiration time

  constructor(@InjectRedis() private readonly redisService: Redis) {}

  async generateCaptcha(uniqueId: string): Promise<string> {
    const captcha = svgCaptcha.create()
    const captchaKey = `captcha:${uniqueId}`

    // Store captcha text in Redis with expiration
    await this.redisService.setex(captchaKey, this.captchaExpire, captcha.text)

    // Return captcha SVG
    return captcha.data
  }

  async validateCaptcha(
    uniqueId: string,
    inputCaptcha: string
  ): Promise<boolean> {
    const captchaKey = `captcha:${uniqueId}`
    const storedCaptcha = await this.redisService.get(captchaKey)

    if (storedCaptcha === null) {
      return false // Captcha expired or does not exist
    }

    const isValid = storedCaptcha === inputCaptcha
    if (isValid) {
      await this.redisService.del(captchaKey) // Remove captcha after successful validation
    }

    return isValid
  }
}
