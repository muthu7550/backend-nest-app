import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);                                                                           
app.enableCors({
  origin: [
    'https://front-end-ui-for-nest-6nibg9x4d-muthu7550s-projects.vercel.app',
    'http://localhost:3000',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});
  await app.listen( 5000);
}
bootstrap();
