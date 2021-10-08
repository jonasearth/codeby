import { Injectable } from '@nestjs/common';
import { TopicEnum } from '../events/enums/topic.enum';
import { KafkaEventTypeEnum } from '../events/types/kafka-event-type.enum';
import { KafkaService } from '../events/kafka-events.service';
import { CountProductsInputSchema } from './schemas/count-products-input.schema';
import { VtexIntegration } from './vtex.integration';

@Injectable()
export class VtexService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private readonly kafkaService: KafkaService,
    private readonly vtexIntegration: VtexIntegration,
  ) {}

  async countProducts(): Promise<number> {
    let from = 1;
    let to = 50;
    let done = false;
    let count = 0;
    while (!done) {
      // eslint-disable-next-line no-await-in-loop
      const data = await this.vtexIntegration.find(from, to);
      count += data.length;
      from += 50;
      to += 50;
      if (data.length < 50) {
        done = true;
      }
    }
    return count;
  }

  countProductsByQueue(data: CountProductsInputSchema): void {
    this.kafkaService.emit(
      data,
      KafkaEventTypeEnum.VTEX_PRODUCTS_COUNT,
      TopicEnum.THIRD_PARTY_VTEX,
    );
  }
}
