import { forwardRef, Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
// eslint-disable-next-line import/no-cycle
import { VtexModule } from '../vtex/vtex.module';
import { kafkaConfigs } from '../config/kafka/kafka.config';
import { KafkaEventsController } from './kafka-events.controller';
import { KafkaService } from './kafka-events.service';

@Module({
  imports: [
    ClientsModule.register([kafkaConfigs]),
    forwardRef(() => VtexModule),
  ],
  controllers: [KafkaEventsController],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaEventsModule {}
