import { HttpService } from '@nestjs/axios';
import { HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { assert } from 'chai';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { of } from 'rxjs';
import * as sinon from 'sinon';
import * as winston from 'winston';
import { AxiosHelper } from '../../shared/test/helpers/axios.helper';
import env from '../vtex.env';
import { VtexIntegration } from '../vtex.integration';

describe('Vtex integration', () => {
  const httpService = sinon.createStubInstance(HttpService);
  const logger = sinon.stub(winston.createLogger());
  const baseUrl = env.VTEX_API_BASE_URL;

  let vtexIntegration: VtexIntegration;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        VtexIntegration,
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

    vtexIntegration = module.get<VtexIntegration>(VtexIntegration);
  });

  afterEach(() => {
    sinon.reset();
  });

  it('Should find by filters', async () => {
    const url = `${baseUrl}/products/search?_from=1&_to=50`;

    const config = VtexIntegration.getConfig();

    const expected = [{ a: 'b' }];

    const axiosResponse = AxiosHelper.createAxiosResponse(
      HttpStatus.OK,
      expected,
    );

    httpService.get.withArgs(url, config).returns(of(axiosResponse));

    const actual = await vtexIntegration.find(1, 50);

    assert.equal(actual, expected);

    sinon.assert.calledOnceWithExactly(httpService.get, url, config);
  });
});
