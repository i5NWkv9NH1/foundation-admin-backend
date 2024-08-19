import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import { GlobalExceptionFilter } from './common/filters/global-exception.filter'
import { GlobalInterceptor } from './common/interceptors/global.interceptor'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
    snapshot: true
  })

  // const configService = app.get(ConfigService)

  // // 从配置文件中获取相对路径
  // const uploadPath = configService.get<string>('UPLOAD_PATH')
  // const relativePath = configService.get<string>('CLOUD_STORAGE_RELATIVE_PATH')
  // if (!relativePath) {
  //   throw new Error(
  //     'CLOUD_STORAGE_RELATIVE_PATH is not defined in the environment variables'
  //   )
  // }
  // app.useStaticAssets(join(cwd(), uploadPath, relativePath), {
  //   prefix: 'uploads'
  // })

  app.enableCors({
    origin: true
  })
  // 需要依赖注入
  // app.useGlobalFilters(new SystemExceptionFilter())
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
      // skipMissingProperties: true
    })
  )
  // TODO: build custom logger implement nest.js and pino
  // app.useLogger(app.get(Logger))
  app.useGlobalInterceptors(new GlobalInterceptor())
  app.useGlobalFilters(new GlobalExceptionFilter())
  app.setGlobalPrefix('api')
  await app.listen(3200)
}
bootstrap()
