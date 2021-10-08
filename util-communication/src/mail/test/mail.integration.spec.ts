import { HttpService } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import * as sinon from 'sinon';
import * as winston from 'winston';
import { MailIntegration } from '../mail.integration';

describe('Mail integration', () => {
  const httpService = sinon.createStubInstance(HttpService);
  const logger = sinon.stub(winston.createLogger());

  let mailIntegration: MailIntegration;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        MailIntegration,
        {
          provide: HttpService,
          useValue: httpService,
        },
        {
          provide: WINSTON_MODULE_PROVIDER,
          useValue: logger,
        },
      ],
    }).compile();

    mailIntegration = module.get<MailIntegration>(MailIntegration);
  });

  afterEach(() => {
    sinon.reset();
  });

  it('Should find by filters', async () => {
    try {
      await mailIntegration.sendMail(
        'jonasearth1@gmail.com',
        'teste',
        'contagem: 50',
      );
    } catch (e) {
      throw new Error('Not expected error!');
    }
  });
});
