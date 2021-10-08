import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { firstValueFrom } from 'rxjs';
import env from './vtex.env';

@Injectable()
export class VtexIntegration {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly httpService: HttpService) {}

  static getConfig(): AxiosRequestConfig {
    const headers = VtexIntegration.getHeaders();

    return { headers };
  }

  static getHeaders(): object {
    return { 'Content-Type': 'application/json', Accept: 'application/json' };
  }

  async find(from: number, to: number): Promise<[]> {
    const url = env.VTEX_API_BASE_URL;

    const config = VtexIntegration.getConfig();

    const observable = this.httpService.get(
      `${url}/products/search?_from=${from}&_to=${to}`,
      config,
    );

    const { data } = await firstValueFrom(observable);

    return data;
  }
}
