import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaExceptionFilters } from './exceptions-filters/prisma.exception-filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new PrismaExceptionFilters());

  await app.listen(3000);
}
bootstrap();
