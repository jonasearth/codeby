import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CountProductsResponseSchema {
  @Expose()
  public message: string;
}
