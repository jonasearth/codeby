import { ClientProviderOptions, Transport } from '@nestjs/microservices';
import { SASLOptions } from '@nestjs/microservices/external/kafka.interface';
import env from '../../app.env';

const KAFKA_TOKEN = 'KAFKA_CLIENT';

const getSasl = (isSsl: boolean): SASLOptions | undefined => {
  if (!isSsl) {
    return undefined;
  }

  return {
    mechanism: 'plain',
    username: env.KAFKA_SASL_USERNAME,
    password: env.KAFKA_SASL_PASSWORD,
  };
};

const getKafkaConfigs = () => {
  const isSsl = !!env.KAFKA_SSL;

  const kafkaConfigs: ClientProviderOptions = {
    name: KAFKA_TOKEN,
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [env.KAFKA_CLIENT_BROKER],
        requestTimeout: 60000,
        ssl: isSsl,
        sasl: getSasl(isSsl),
      },
      consumer: {
        groupId: env.KAFKA_CONSUMER_GROUP,
        sessionTimeout: 30000,
      },
    },
  };

  return kafkaConfigs;
};

const kafkaConfigs = getKafkaConfigs();

export { KAFKA_TOKEN, kafkaConfigs };
