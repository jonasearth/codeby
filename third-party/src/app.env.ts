import * as dotenv from 'dotenv';

dotenv.config();

const env = {
  HOST: process.env.HOST ?? '0.0.0.0',
  PORT: process.env.PORT ?? 3000,
  LOG_CONSOLE_LEVEL: process.env.LOG_CONSOLE_LEVEL as string,
  LOG_FILE_ACTIVE: (process.env.LOG_FILE_ACTIVE ?? 'false') === 'true',
  LOG_FILE_LEVEL: process.env.LOG_FILE_LEVEL as string,
  LOG_FILE_NAME: process.env.LOG_FILE_NAME as string,
  BASE_PATH: (process.env.BASE_PATH ?? '') as string,
  KAFKA_CLIENT_BROKER: process.env.KAFKA_CLIENT_BROKER ?? 'kafka:9092',
  KAFKA_SSL: (process.env.KAFKA_SSL ?? false) === 'true',
  KAFKA_SASL_USERNAME: process.env.KAFKA_SASL_USERNAME ?? '$ConnectionString',
  KAFKA_SASL_PASSWORD: process.env.KAFKA_SASL_PASSWORD as string,
  KAFKA_CONSUMER_GROUP:
    process.env.CONSUMER_GROUP ?? 'util-communication-consumer',
};

export default Object.freeze(env);
