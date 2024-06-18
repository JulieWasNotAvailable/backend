import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Kitchens store OpenAPI 3.0')
    .setDescription(
      `[The source API definition (json)](http://${process.env.SERVER}:${process.env.PORT}/api-json)`,
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = parseInt(process.env.PORT);
  console.log('port = ', process.env.PORT);
  const server = process.env.SERVER;

  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3000/testpage'],
    allowedHeaders: ['content-type'],
  });

  await app.listen(port, server);

  console.log(`Application is running on: ${await app.getUrl()}`);

  app.useGlobalPipes(new ValidationPipe());
}
bootstrap();
