import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { VtexService } from '../vtex/vtex.service';
import { CountProductsInputSchema } from '../vtex/schemas/count-products-input.schema';
import { TopicEnum } from './enums/topic.enum';
import { KafkaService } from './kafka-events.service';
import { AbstractEventSchema } from './schemas/abstract-event.schema';
import { KafkaEventTypeEnum } from './types/kafka-event-type.enum';

@Controller()
export class KafkaEventsController {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private readonly kafkaService: KafkaService,
    private readonly vtexService: VtexService,
  ) {}

  @EventPattern(TopicEnum.THIRD_PARTY_VTEX)
  async vtexSubscriber(
    @Payload('value') data: AbstractEventSchema,
  ): Promise<void> {
    switch (data.type) {
      case KafkaEventTypeEnum.VTEX_PRODUCTS_COUNT:
        {
          const countProductsInputSchema =
            data.message as CountProductsInputSchema;

          const count = await this.vtexService.countProducts();

          this.kafkaService.emit(
            { email: countProductsInputSchema.email, count },
            KafkaEventTypeEnum.VTEX_PRODUCTS_COUNTED,
            TopicEnum.THIRD_PARTY_VTEX,
          );
        }

        break;

      default:
    }
  }
}
