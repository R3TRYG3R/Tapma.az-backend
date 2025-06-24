import { join } from 'path'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ClassSerializerInterceptor } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import * as express from 'express'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')))

  // Включаем CORS
  app.enableCors({
    origin: ['http://localhost:5173'],
    credentials: true,
  })

  const config = new DocumentBuilder()
    .setTitle('Marketplace API')
    .setDescription('Public API for minimalist ad platform')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'jwt',
    )
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(3000)
}
bootstrap()