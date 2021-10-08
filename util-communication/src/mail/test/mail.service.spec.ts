import { Test } from '@nestjs/testing';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import * as sinon from 'sinon';
import * as winston from 'winston';
import { KafkaService } from '../../events/kafka-events.service';
import { MailIntegration } from '../mail.integration';
import { MailService } from '../mail.service';

describe('Mail service', () => {
  const mailIntegration = sinon.createStubInstance(MailIntegration);
  const logger = sinon.stub(winston.createLogger());
  let mailService: MailService;
  const kafkaService = sinon.createStubInstance(KafkaService);
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        MailService,
        {
          provide: MailIntegration,
          useValue: mailIntegration,
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

    mailService = module.get<MailService>(MailService);
  });

  afterEach(() => {
    sinon.reset();
  });

  it('Should call kafka service', async () => {
    await mailService.sendCountMail('jonasearth1@gmail.com', 30);
    sinon.assert.calledOnce(mailIntegration.sendMail);
  });
});
