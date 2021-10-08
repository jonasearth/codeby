import { forwardRef, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
// eslint-disable-next-line import/no-cycle
import { KafkaEventsModule } from '../events/kafka-events.module';
import { MailIntegration } from './mail.integration';
import { MailService } from './mail.service';

@Module({
  imports: [HttpModule, forwardRef(() => KafkaEventsModule)],
  providers: [MailService, MailIntegration],
  exports: [MailService, MailIntegration],
})
export class VtexModule {}
