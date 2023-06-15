import { NestFactory } from '@nestjs/core';
import { TaskModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(TaskModule);
  app.enableCors({
    origin: "http://localhost:5173",
    credentials: true,
  })
  await app.listen(3000);
}
bootstrap();
