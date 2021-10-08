import { forwardRef, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
// eslint-disable-next-line import/no-cycle
import { KafkaEventsModule } from '../events/kafka-events.module';
import { VtexController } from './vtex.controller';
import { VtexIntegration } from './vtex.integration';
import { VtexService } from './vtex.service';

@Module({
  imports: [HttpModule, forwardRef(() => KafkaEventsModule)],
  providers: [VtexService, VtexIntegration],
  controllers: [VtexController],
  exports: [VtexService, VtexIntegration],
})
export class VtexModule {}
