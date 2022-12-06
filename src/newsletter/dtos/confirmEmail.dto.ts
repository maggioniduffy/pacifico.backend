import { IsNotEmpty, IsJWT } from 'class-validator';

export class SendEmailDto {
  @IsNotEmpty()
  @IsJWT()
  token: string;
}
