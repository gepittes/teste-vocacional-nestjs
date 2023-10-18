import * as dotenv from 'dotenv';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule, { cors: true });
  const configSwagger = new DocumentBuilder()
    .setTitle('Teste vocacional')
    .setDescription(
      'Teste vocacional da Feira das profissões | UNIDESC - Centro Universitário de Desenvolvimento do Centro Oeste',
    )
    .setVersion('1.0')
    .addTag('Teste vocacional')
    .build();

  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup(process.env.SWAGGER_PATH, app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
