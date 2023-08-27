import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaExceptionFilters } from './exceptions-filters/prisma.exception-filters';
import { CatchAllErrorsExceptionsFilter } from './exceptions-filters/catch-all-errors.exceptions-filter';
import { ValidationPipe } from '@nestjs/common';
import { InvalidRelationExcetionFilter } from './exceptions-filters/invalid-relation.exception-filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new CatchAllErrorsExceptionsFilter(httpAdapter),
    new PrismaExceptionFilters(),
    new InvalidRelationExcetionFilter(),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Nestjs 10 - Video API')
    .setDescription('The video API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
