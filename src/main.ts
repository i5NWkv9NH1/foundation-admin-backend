import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: true
  })
  app.useGlobalPipes(
    new ValidationPipe({
      // transform: true
    })
  )
  // app.useGlobalFilters(new GlobalExceptionFilter())
  app.setGlobalPrefix('api')
  await app.listen(3200)
}
bootstrap()
