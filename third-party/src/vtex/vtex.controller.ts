/* eslint-disable class-methods-use-this */
import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { CountProductsInputSchema } from './schemas/count-products-input.schema';
import { CountProductsResponseSchema } from './schemas/count-products-response.schema';
import { VtexService } from './vtex.service';

@Controller('vtex')
export class VtexController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly vtexService: VtexService) {}

  @Get('count-products')
  @HttpCode(HttpStatus.ACCEPTED)
  async countProducts(
    @Query() data: CountProductsInputSchema,
  ): Promise<CountProductsResponseSchema> {
    this.vtexService.countProductsByQueue(data);
    return { message: 'Making a coffie pls wait!' };
  }
}
