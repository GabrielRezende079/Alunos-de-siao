import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['https://alunos-de-siao.vercel.app/'], // Replace with your exact domain
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // If your app requires cookies or authorization headers
  });
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
