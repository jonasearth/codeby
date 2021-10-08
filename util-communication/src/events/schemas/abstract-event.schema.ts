import { KafkaEventTypeEnum } from '../types/kafka-event-type.enum';

export abstract class AbstractEventSchema {
  type: KafkaEventTypeEnum;

  message: unknown;

  socketId: string;
}
