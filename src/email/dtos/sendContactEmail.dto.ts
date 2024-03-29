import { IsNotEmpty, IsString } from 'class-validator';

export class SendContactEmailDto {
  @IsNotEmpty()
  @IsString()
  from: string;

  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
