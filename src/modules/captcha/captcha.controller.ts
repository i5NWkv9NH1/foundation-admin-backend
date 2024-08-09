import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
  UseGuards
} from '@nestjs/common'
import { Throttle, ThrottlerGuard } from '@nestjs/throttler'
import { Response } from 'express'
import { CaptchaService } from './captcha.service'

@Controller('captcha')
export class CaptchaController {
  constructor(private readonly captchaService: CaptchaService) {}

  @Get('generate')
  @UseGuards(ThrottlerGuard)
  @Throttle({
    default: { limit: 5, ttl: 60 }
  }) // 每60秒最多请求5次
  async generateCaptcha(
    @Query('uniqueId') uniqueId: string,
    @Res() res: Response
  ) {
    if (!uniqueId) {
      throw new BadRequestException('uniqueId is required')
    }

    const captchaSvg = await this.captchaService.generateCaptcha(uniqueId)
    res.set('Content-Type', 'image/svg+xml')
    res.send(captchaSvg)
  }

  @Post('validate')
  async validateCaptcha(
    @Body() body: { uniqueId: string; captcha: string },
    @Res() res: Response
  ) {
    const { uniqueId, captcha } = body
    if (!uniqueId || !captcha) {
      throw new BadRequestException('uniqueId and captcha are required')
    }
    const isValid = await this.captchaService.validateCaptcha(uniqueId, captcha)

    if (isValid) {
      res.status(HttpStatus.OK).send({ message: 'Captcha valid' })
    } else {
      res.status(HttpStatus.BAD_REQUEST).send({ message: 'Invalid captcha' })
    }
  }
}
