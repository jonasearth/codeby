import { Exclude, Expose } from 'class-transformer';
import { IsEmail } from 'class-validator';

@Exclude()
export class CountProductsInputSchema {
  @Expose()
  @IsEmail()
  public email: string;
}
