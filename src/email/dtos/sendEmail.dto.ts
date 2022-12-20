import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendEmailDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  to: string;

  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}

export class SendDiffusionEmailDto {
  @IsNotEmpty()
  @IsArray()
  to: string[];

  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
