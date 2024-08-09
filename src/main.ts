import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { Logger } from 'nestjs-pino'
import { AppModule } from './app.module'

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
      // transform: true
    })
  )
  app.useLogger(app.get(Logger))
  // app.useGlobalFilters(new GlobalExceptionFilter())
  app.setGlobalPrefix('api')
  await app.listen(3200)
}
bootstrap()
