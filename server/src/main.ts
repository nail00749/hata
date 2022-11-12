import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import fastifyCookie from '@fastify/cookie';
import { contentParser } from 'fastify-multer';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule,
    new FastifyAdapter(),
  );
  app.enableCors({
    origin: true,
    credentials: true
  });
  await app.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET,
  });

  await app.register(contentParser);
  app.useStaticAssets({ root: path.join(__dirname, '..', 'src', 'static') });
  await app.listen(5000, '0.0.0.0');
}

bootstrap();
