import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { KAFKA_TOKEN } from '../config/kafka/kafka.config';
import { TopicEnum } from './enums/topic.enum';
import { KafkaEventTypeEnum } from './types/kafka-event-type.enum';

@Injectable()
export class KafkaService implements OnModuleInit {
  // eslint-disable-next-line no-useless-constructor
  constructor(@Inject(KAFKA_TOKEN) private readonly kafkaClient: ClientKafka) {}

  async onModuleInit(): Promise<void> {
    await this.kafkaClient.connect();
  }

  emit<TResult>(
    message: unknown,
    type: KafkaEventTypeEnum,
    topic: TopicEnum,
  ): Observable<TResult> {
    const data = {
      message,
      type,
    };

    return this.kafkaClient.emit(topic, JSON.stringify(data));
  }
}
