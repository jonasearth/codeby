import { Test } from '@nestjs/testing';
import { assert } from 'chai';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import * as sinon from 'sinon';
import * as winston from 'winston';
import { KafkaService } from '../../events/kafka-events.service';
import { VtexIntegration } from '../vtex.integration';
import { VtexService } from '../vtex.service';

describe('Vtex service', () => {
  const vtexIntegration = sinon.createStubInstance(VtexIntegration);
  const logger = sinon.stub(winston.createLogger());
  let vtexService: VtexService;
  const kafkaService = sinon.createStubInstance(KafkaService);
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        VtexService,
        {
          provide: VtexIntegration,
          useValue: vtexIntegration,
        },
        {
          provide: KafkaService,
          useValue: kafkaService,
        },
        {
          provide: WINSTON_MODULE_PROVIDER,
          useValue: logger,
        },
      ],
    }).compile();

    vtexService = module.get<VtexService>(VtexService);
  });

  afterEach(() => {
    sinon.reset();
  });

  it('Should call kafka service', async () => {
    await vtexService.countProductsByQueue({
      email: 'jonasearth1@gmail.com',
    });
    sinon.assert.calledOnce(kafkaService.emit);
  });
  it('Should return a number of products', async () => {
    vtexIntegration.find.withArgs(1, 50).resolves([]);
    const count = await vtexService.countProducts();
    assert.equal(count, 0);
  });
});
