import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app/app.module';
import * as fs from 'fs';

const httpsOptions = {
  key: fs.readFileSync('../localhost-key.pem'),
  cert: fs.readFileSync('../localhost.pem'),
  ca: fs.readFileSync('/etc/ssl/certs/ca-certificates.crt')
};

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    httpsOptions: httpsOptions
  });
  app.useStaticAssets(join(__dirname, '..', 'public/images'), {
    prefix: '/public/images/',
  });
  await app.listen(8000);
}
bootstrap();
