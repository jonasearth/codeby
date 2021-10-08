import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SendCountProductsMailSchema } from '../mail/schemas/send-count-product-mail-data.schema';
import { MailService } from '../mail/mail.service';
import { TopicEnum } from './enums/topic.enum';
import { KafkaService } from './kafka-events.service';
import { AbstractEventSchema } from './schemas/abstract-event.schema';
import { KafkaEventTypeEnum } from './types/kafka-event-type.enum';

@Controller()
export class KafkaEventsController {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private readonly kafkaService: KafkaService,
    private readonly mailService: MailService,
  ) {}

  @EventPattern(TopicEnum.THIRD_PARTY_VTEX)
  async vtexSubscriber(
    @Payload('value') data: AbstractEventSchema,
  ): Promise<void> {
    console.log('Evento escutado');

    switch (data.type) {
      case KafkaEventTypeEnum.VTEX_PRODUCTS_COUNTED:
        {
          const mailData = data.message as SendCountProductsMailSchema;

          this.mailService.sendCountMail(mailData.email, mailData.count);
        }

        break;

      default:
    }
  }
}
