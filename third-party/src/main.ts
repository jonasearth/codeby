import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express/interfaces';
import { json } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import env from './app.env';
import { AppModule } from './app.module';
import { kafkaConfigs } from './config/kafka/kafka.config';
import { MAX_FILE_BYTE_LENGTH } from './shared/constants/file-upload';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  app.enableCors({
    origin: [/^(http|https):\/\/localhost:\d{2,4}$/],
    credentials: true,
  });

  app.setGlobalPrefix(env.BASE_PATH);

  app.use(json({ limit: MAX_FILE_BYTE_LENGTH }));

  app.connectMicroservice(kafkaConfigs);

  app.startAllMicroservices();

  await app.listen(env.PORT, env.HOST);
}

bootstrap();
