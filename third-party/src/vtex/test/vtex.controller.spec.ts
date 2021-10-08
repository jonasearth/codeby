import {
  ClassSerializerInterceptor,
  HttpStatus,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import * as sinon from 'sinon';
import * as winston from 'winston';
import { Test } from '@nestjs/testing';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import * as request from 'supertest';
import { assert } from 'chai';
import validationPipeConfigs from '../../config/class-validator/validation.config';
import { ApplicationExceptionFilter } from '../../shared/filters/application-exception.filter';
import { AxiosErrorInterceptor } from '../../shared/interceptors/axios-error.interceptor';
import { VtexService } from '../vtex.service';
import { VtexController } from '../vtex.controller';

describe('Third Party Vtex Controller', () => {
  const logger = sinon.stub(winston.createLogger());

  const vtexService = sinon.createStubInstance(VtexService);

  let app: INestApplication;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [VtexController],
      providers: [
        {
          provide: VtexService,
          useValue: vtexService,
        },
        {
          provide: APP_FILTER,
          useClass: ApplicationExceptionFilter,
        },
        {
          provide: APP_INTERCEPTOR,
          useClass: AxiosErrorInterceptor,
        },
        {
          provide: APP_INTERCEPTOR,
          useClass: ClassSerializerInterceptor,
        },
        {
          provide: APP_PIPE,
          useValue: new ValidationPipe(validationPipeConfigs),
        },
        {
          provide: WINSTON_MODULE_PROVIDER,
          useValue: logger,
        },
      ],
    }).compile();
    app = module.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    sinon.reset();
  });

  it('Should return a msg body correct', async () => {
    return request(app.getHttpServer())
      .get('/vtex/count-products')
      .query({ email: 'jonasearth1@gmail.com' })
      .then((response) => {
        assert.equal(response.status, HttpStatus.ACCEPTED);

        const { body } = response;
        assert.deepEqual(body, {
          message: 'You request is processing, wait for email!',
        });
      });
  });
});
