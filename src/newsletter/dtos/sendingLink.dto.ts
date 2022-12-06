import { IsEmail, IsJWT, IsNotEmpty } from 'class-validator';

export class SendingLinkDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsJWT()
  token: string;
}
