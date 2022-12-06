import { IsNotEmpty, IsJWT } from 'class-validator';

export class ConfirmEmailDto {
  @IsNotEmpty()
  @IsJWT()
  token: string;
}
