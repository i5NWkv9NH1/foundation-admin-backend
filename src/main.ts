import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { GlobalExceptionFilter } from './shared/filters/global-exception.filter'
import { GlobalInterceptor } from './shared/interceptors/global.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true
  })

  app.enableCors({
    origin: true
  })
  // 需要依赖注入
  // app.useGlobalFilters(new SystemExceptionFilter())
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      skipMissingProperties: true
    })
  )
  // app.useGlobalPipes(new ValidationPipe())
  // TODO: build custom logger implement nest.js and pino
  // app.useLogger(app.get(Logger))
  app.useGlobalInterceptors(new GlobalInterceptor())
  app.useGlobalFilters(new GlobalExceptionFilter())
  app.setGlobalPrefix('api')
  await app.listen(3200)
}
bootstrap()
