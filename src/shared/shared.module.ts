import { Module } from '@nestjs/common'
import { CaptchaModule } from 'src/shared/captcha/captcha.module'
import { FileModule } from 'src/shared/file/file.module'

@Module({
  imports: [CaptchaModule, FileModule]
})
export class SharedModule {}
