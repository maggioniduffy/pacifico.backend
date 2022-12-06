import { IsNotEmpty, IsEmail, IsJWT, IsNumber } from 'class-validator';

export class SendEmailDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsJWT()
  token: string;

  @IsNotEmpty()
  @IsNumber()
  ts: number;
}
