import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Res
} from '@nestjs/common'
import { Response } from 'express'
import { CaptchaService } from './captcha.service'

@Controller('captcha')
export class CaptchaController {
  constructor(private readonly captchaService: CaptchaService) {}

  @Get()
  async getCaptcha(@Res() res: Response) {
    const captcha = await this.captchaService.generateCaptcha()
    res.setHeader('Content-Type', 'image/svg+xml')
    res.setHeader('Captcha-Id', captcha.captchaId)
    res.send(captcha.data)
  }

  @Post('verify')
  async verifyCaptcha(
    @Body('captchaId') captchaId: string,
    @Body('captcha') captcha: string
  ) {
    const isValid = await this.captchaService.validateCaptcha(
      captchaId,
      captcha
    )

    if (!isValid) {
      throw new BadRequestException('Invalid CAPTCHA')
    }

    return { message: 'CAPTCHA is valid' }
  }
}
