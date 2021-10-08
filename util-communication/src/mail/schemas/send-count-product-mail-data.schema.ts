import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SendCountProductsMailSchema {
  @Expose()
  public email: string;

  @Expose()
  public count: number;
}
